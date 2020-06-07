const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')
const Staff = require('../../../src/config/models').Staff

function changeStaffProfilePhoto(req,res,next){
    if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:401,type:'unauthorised'})
    }else{
        const busboy = new Busboy({headers:req.headers,limits:{files:1,fileSize:512000}})

        busboy.on('file',(fieldname, file, filename, encoding, mimetype)=>{

            let typeArray = ['jpg','bmp','png']
            let ext = filename.split('.').pop()
            
            if(typeArray.includes(ext)){
                    
                    let storagePath = path.join('/images/staff',req.user._id+Date.now()+'.'+ext)
                    let fullPath = path.join(process.cwd(),'/public',storagePath)
                    let wstream = fs.createWriteStream(fullPath)

                    file.pipe(wstream)

                    file.on('limit',()=>{
                        fs.unlink(fullPath,()=>{
                            limit_reach = true
                            res.json({status:455,type:'excceds'})
                        })
                    })

                    file.on('end',()=>{
                        Staff.findOneAndUpdate(
                                {   _id:req.user._id},
                                {'$set':{photo:storagePath}},
                                {new:true,strict:false},
                                (err,staff)=>{
                                if(err){res.json({status:500})}
                                else if(staff){
                                    if(req.user.photo === null){
                                        res.json({status:200,photo:staff.photo})
                                    }else{
                                        let epath = path.join(process.cwd(),'/public',req.user.photo)
                                        fs.unlink(epath,()=>{
                                             res.json({status:200,photo:staff.photo})
                                        })
                                    }
                                }
                                else{res.json({status:422,type:'user doesnot exist'})}
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