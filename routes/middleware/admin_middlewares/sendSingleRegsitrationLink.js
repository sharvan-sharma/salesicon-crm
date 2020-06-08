const {isEmail} = require('../../../src/utils/validations')
const {sendEmail} = require('../../../src/utils/mail')
const {staffRegistrationEmailTemplate} = require('../../../src/utils/mail/templates')
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    if(!req.body.email || !isEmail(req.body.email)){
        res.json({status:423,type:'email'})
    }else if(!req.user || req.user.account_type !== 'admin'){
        res.json({status:423,type:'unauthorised'})
    }else{
        jwt.sign({admin_id:req.user._id,email:req.body.email},proccess.env.STAFF_REGISTER_SECRET,(err,token)=>{
           if(err){res.json({status:500,type:'token_error'})}
           else{
                let promise = sendEmail(staffRegistrationEmailTemplate(req.body.email,token))
                promise.then(()=>{res.json({status:200,type:'mail_sent'})})
                .catch((err)=>{ res.json({status:500,type:'mail_error'})})
           }
        })
    }
}