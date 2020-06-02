const Staff = require('../../../src/config/models').Staff
const sendEmail = require('../../../src/utils/mail').sendEmail
const approvalEmailTemplate = require('../../../src/utils/mail/templates').approvalEmailTemplate
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    if(!req.body.staff_id || req.body.staff_id.length !== 24){
        res.json({status:423,type:'staff_id'})
    }else if(!req.user || req.user.account_type !== 'admin'){
        res.json({status:401,type:'unauthorized'})
    }else{
        Staff.findOne({_id:req.body.staff_id},{verified:1,approved:1,email:1,name:1},(err,staff)=>{
            if(err){res.json({status:500,type:'server error'})}
            else if(staff){
                if(staff.verified && !staff.approved){
                    jwt.sign({id:staff._id},process.env.STAFF_APPROVAL_SECRET,(err,token)=>{
                        if(err){res.json({status:500,type:'jwt_error'})}
                        else{
                            let promise = sendEmail(approvalEmailTemplate(staff.email,staff.name,token))
                            promise.then(()=>{res.json({status:200,type:'mail_sent'})})
                            .catch((err)=>{ res.json({status:500,type:'mail_error'})})
                        }
                    })
                }else{
                    if(verified){
                        res.json({status:455,type:'already_approved'})
                    }else{
                        res.json({status:455,type:'staff_not_verified'})
                    }
                }
            }
            else{res.json({status:422,type:'staff_doesnot_exist'})}
        })
    }
}