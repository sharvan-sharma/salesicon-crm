const Admin = require('../../../src/config/models').Admin
const sendEmail = require('../../../src/utils/mail').sendEmail
const verifyEmailTemplate = require('../../../src/utils/mail/templates').verifyEmailTemplate
const jwt = require('jsonwebtoken')
const winslogger = require('../../../src/logger')


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
                    winslogger.info(`admin successfully created admin with email ${admin.email}`)
                    jwt.sign({id:admin._id},process.env.ADMIN_VERIFY_SECRET,{expiresIn:3600},(err,token)=>{
                        if(err){
                            res.json({status:500,type:'token_error'})
                            winslogger.error(`admin error while generating verification token for admin`)
                        }
                        else{
                            res.json({status:200,type:'mail_sent'})
                            let promise = sendEmail(verifyEmailTemplate(req.body.email,req.body.name,token))
                            promise.then(()=>{
                                winslogger.info(`admin sucessfully sent verification email to ${admin.email}`)
                            })
                            .catch((err)=>{ 
                                winslogger.error(`admin error while sending verification email to ${admin.email}`)
                            })
                        }
                    })
                }
                else{res.json({msg:'document creation failed in cb'})}
            })
}

module.exports = registerAdmin