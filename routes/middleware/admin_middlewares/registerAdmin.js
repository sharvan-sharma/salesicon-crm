const Admin = require('../../../src/config/models').Admin
const sendEmail = require('../../../src/utils/mail').sendEmail
const verifyEmailTemplate = require('../../../src/utils/mail/templates').verifyEmailTemplate
const jwt = require('jsonwebtoken')


function registerAdmin(req,res,next){
            Admin.register({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    verified:false,
                    approved:false,
                },
                    req.body.password
                ,(err,admin)=>{
                if(err){res.json({status:500})}
                else if(admin){
                    jwt.sign({id:admin._id},process.env.ADMIN_VERIFY_SECRET,{expiresIn:3600},(err,token)=>{
                        if(err){res.json({status:500,type:'token_error'})}
                        else{
                            let promise = sendEmail(verifyEmailTemplate(req.body.email,req.body.name,token))
                            promise.then(()=>{res.json({status:200,type:'mail_sent'})})
                            .catch((err)=>{ res.json({status:500,type:'mail_error'})})
                        }
                    })
                }
                else{res.json({msg:'document creation failed in cb'})}
            })
}

module.exports = registerAdmin