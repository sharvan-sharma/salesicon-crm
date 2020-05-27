const Busboy = require('busboy')
const path = require('path')
const Admin = require('../../../src/config/models').Admin
const fs = require('fs')

function changeAdminProfilePhoto(req,res,next){
    if(!req.isAuthenticated() || req.user.account_type !== 'admin'){
        res.json({status:423,type:'unauthorized'})
    }else{
        const busboy = new Busboy({headers:req.headers,limits:{files:1,fileSize:512000}})

        let errflag = false
        let limit_reach = false
        let alreadyExists = false
        let fullPath = ''
        let alternatePath = ''


        busboy.on('file',(fieldname, file, filename, encoding, mimetype)=>{
            let ext = filename.split('.').pop()
            let typeArray  = ['jpg','png','bmp']
            fullPath = path.join(process.cwd(),'/public/images/admin',req.user._id+'.'+ext)
            alternatePath = path.join(process.cwd(),'/public/images/admin',req.user._id+'-2.'+ext)
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
                errflag= true
                res.json({status:455,type:'invalid file type'})
            }
        })


        busboy.on('finish',()=>{
            if(!limit_reach){
                if(!errflag){
                    if(alreadyExists){
                        fs.unlink(fullPath,()=>{
                            fs.rename(alternatePath,fullPath,()=>{
                                res.json({status:200,photo:fullPath})
                            })
                        })   
                    }else{
                        Admin.findOneAndUpdate(
                            {_id:req.user._id},
                            {'$set':{photo:fullPath}},
                            {new:true,strict:false},
                            (err,admin)=>{
                            if(err){res.json({status:500})}
                            else if(admin){res.json({status:200,photo:admin.photo})}
                            else{res.json({status:401})}
                        })
                    }
                }
            }
        })
    
        req.pipe(busboy)
    }
}

module.exports = changeAdminProfilePhoto