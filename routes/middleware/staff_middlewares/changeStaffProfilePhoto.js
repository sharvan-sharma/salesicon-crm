const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')
const Staff = require('../../../src/config/models').Staff

function changeStaffProfilePhoto(req,res,next){
        const busboy = new Busboy({headers:req.headers,limits:{files:1,fileSize:512000}})

        let obj = {}
        let errflag = false
        let limit_reach = false
        let alreadyExists = false
        let fullPath = ''
        let alternatePath = ''

        busboy.on('field',(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype)=>{
            obj[fieldname] = val
        })

        busboy.on('file',(fieldname, file, filename, encoding, mimetype)=>{
            let typeArray = ['jpg','bmp','png']
            let ext = filename.split('.').pop()

            fullPath = path.join(process.cwd(),'/public/images/staff',obj.staff_id+'.'+ext)
            alternatePath = path.join(process.cwd(),'/public/images/staff',obj.staff_id+'-2.'+ext)

            if(typeArray.includes(ext)){
                fs.exists(fullPath,(exists)=>{
                    alreadyExists = exists
                    let wstream = fs.createWriteStream((exists)?alternatePath:fullPath)

                    file.pipe(wstream)

                    file.on('limit',()=>{
                        fs.unlink((exists)?alternatePath:fullPath,()=>{
                            limit_reach = true
                            res.json({status:455,type:'excceds'})
                        })
                    })
                })
            }else{
                errflag = true
                res.json({status:455,type:'invalid'})
            }
        })


        busboy.on('finish',()=>{
            if(!limit_reach){ 
                if(!errflag){
                    if(!obj.staff_id){
                        res.json({status:423,type:'staff id is not defined'})
                    }else{
                        if(alreadyExists){
                            console.log('ndb')
                            fs.unlink(fullPath,()=>{
                                fs.rename(alternatePath,fullPath,()=>{
                                    res.json({status:200,photo:fullPath})
                                })
                            })   
                        }else{
                            Staff.findOneAndUpdate(
                                {   _id:obj.staff_id,
                                },
                                {'$set':{photo:fullPath}},
                                {new:true,strict:false},
                                (err,staff)=>{
                                if(err){res.json({status:500})}
                                else if(staff){res.json({status:200,photo:staff.photo})}
                                else{res.json({status:401})}
                            })
                        }
                    }
                }
            }
        })

        req.pipe(busboy)
    
}

module.exports = changeStaffProfilePhoto