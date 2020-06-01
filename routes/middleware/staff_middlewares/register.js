const Staff = require('../../../src/config/models').Staff
const sendEmail = require('../../../src/utils/mail').sendEmail
const verifyEmailTemplate = require('../../../src/utils/mail/templates').verifyEmailTemplate
const jwt = require('jsonwebtoken')


function register(req,res,next){
            Staff.register({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    status:'IA',
                    verified:false,
                    approved:false,  
                },
                    req.body.password
                ,(err,staff)=>{
                if(err){res.json({status:500})}
                else if(staff){
                    jwt.sign({id:staff._id},process.env.STAFF_VERIFY_SECRET,{expiresIn:3600},(err,token)=>{
                        if(err){res.json({status:500,type:'token_error'})}
                        else{
                            let promise = sendEmail(verifyEmailTemplate(req.body.email,req.body.name,token))
                            promise.then(()=>{
                                    res.json({status:200,type:'mail_sent'})
                            }).catch((err)=>{
                                console.log(err)
                                res.json({status:500,type:'mail_error'})})
                        }
                    })
                    //admin will provide add role while approving staff
                    // StaffRole.create({staff_id:document._id,role_id:req.body.role_id},(err,staffrole)=>{
                    //      if(err){res.json({status:500})}
                    //      else{
                    //         res.json({status:200,staff_id:document._id,staff_role_id:staffrole._id})
                    //      }
                    // })
                }   
                else{res.json({msg:'document creation failed in cb'})}
            })
}

module.exports = register