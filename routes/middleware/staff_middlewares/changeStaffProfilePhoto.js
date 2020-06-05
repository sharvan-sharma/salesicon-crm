const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')
const Staff = require('../../../src/config/models').Staff

function changeStaffProfilePhoto(req,res,next){

    if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:401,type:'unauthorised'})
    }else{
        const busboy = new Busboy({headers:req.headers,limits:{files:1,fileSize:512000}})

        let fullPath = ''
        let alternatePath = ''


        busboy.on('file',(fieldname, file, filename, encoding, mimetype)=>{
            let typeArray = ['jpg','bmp','png']
            let ext = filename.split('.').pop()

            fullPath = path.join(process.cwd(),'/public/images/staff',req.user._id+'.'+ext)
            alternatePath = path.join(process.cwd(),'/public/images/staff',req.user._id+'-2.'+ext)

            if(typeArray.includes(ext)){
                fs.exists(fullPath,(exists)=>{
                    let wstream = fs.createWriteStream((exists)?alternatePath:fullPath)

                    file.pipe(wstream)

                    file.on('limit',()=>{
                        fs.unlink((exists)?alternatePath:fullPath,()=>{
                            limit_reach = true
                            res.json({status:455,type:'excceds'})
                        })
                    })

                    file.on('end',()=>{
                        if(exists){
                            fs.unlink(fullPath,()=>{
                                fs.rename(alternatePath,fullPath,()=>{
                                    res.json({status:200,photo:req.user.photo})
                                })
                            })
                        }else{
                            Staff.findOneAndUpdate(
                                {   _id:req.user._id},
                                {'$set':{photo:'/images/staff/'+req.user._id+'.'+ext}},
                                {new:true,strict:false},
                                (err,staff)=>{
                                if(err){res.json({status:500})}
                                else if(staff){res.json({status:200,photo:staff.photo})}
                                else{res.json({status:422,type:'user doesnot exist'})}
                            })
                        }
                    })
                })
            }else{
                res.json({status:423,type:'invalid_type'})
            }
        })

        req.pipe(busboy)
    }
}

module.exports = changeStaffProfilePhoto