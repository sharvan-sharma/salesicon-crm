const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')
const {Staff,Admin} = require('../../../src/config/models')
const winslogger = require('../../../src/logger')




function changeProfilePhoto(req,res,next){
    if(!req.isAuthenticated()){
        res.json({status:401,type:'unauthorised'})
    }else{
        const busboy = new Busboy({headers:req.headers,limits:{files:1,fileSize:512000}})

        busboy.on('file',(fieldname, file, filename, encoding, mimetype)=>{

            let typeArray = ['jpg','bmp','png']
            let ext = filename.split('.').pop()

            if(typeArray.includes(ext)){
                    let folderPath = (req.user.account_type === 'staff')?'/images/staff':'/images/admin'
                    let storagePath = path.join(folderPath,req.user._id+Date.now()+'.'+ext)
                    let fullPath = path.join(process.cwd(),'/public',storagePath)
                    let wstream = fs.createWriteStream(fullPath)

                    file.pipe(wstream)

                    file.on('limit',()=>{
                        fs.unlink(fullPath,()=>{
                            limit_reach = true
                            res.json({status:455,type:'excceds'})
                        })
                    })

                    file.on('end',()=>{ const Model = (req.user.account_type === 'admin')?Admin:Staff
                        Model.findOneAndUpdate(
                                {   _id:req.user._id},
                                {'$set':{photo:process.env.SERVER_DOMAIN+storagePath}},
                                {new:true,strict:false},
                                (err,user)=>{
                                if(err){res.json({status:500})}
                                else if(user){
                                    if(req.user.photo === null){
                                        res.json({status:200,photo:user.photo})
                                    }else{
                                        let epath = path.join(process.cwd(),'/public/images/',req.user.photo.split('images').pop())
                                        console.log(epath)
                                        fs.unlink(epath,()=>{
                                             res.json({status:200,photo:user.photo})
                                        })
                                        winslogger.info(`${req.user.account_type} ${req.user.email} change profile photo`)
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

module.exports = changeProfilePhoto