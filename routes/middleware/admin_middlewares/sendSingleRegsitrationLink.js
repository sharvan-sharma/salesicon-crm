const {isEmail} = require('../../../src/utils/validations')
const {sendEmail} = require('../../../src/utils/mail')
const {staffRegistrationEmailTemplate} = require('../../../src/utils/mail/templates')
const jwt = require('jsonwebtoken')
const {Staff} = require('../../../src/config/models')

module.exports = (req,res,next)=>{
    if(!req.body.email || !isEmail(req.body.email)){
        res.json({status:423,type:'email'})
    }else if(!req.user || req.user.account_type !== 'admin'){
        res.json({status:401,type:'unauthorised'})
    }else{
        Staff.findOne({admin_id:req.user._id,email:req.body.email},{email:0},(err,staff)=>{
            if(err){req.json({status:500,type:'staff check error'})}
            else if(staff){res.json({status:422,type:'UserAlreadyExist'})}
            else{
                jwt.sign({admin_id:req.user._id,email:req.body.email},process.env.STAFF_REGISTER_SECRET,(err,token)=>{
                    if(err){res.json({status:500,type:'token_error'})}
                    else{
                            res.json({status:200,msg:'mail scheduled'})
                            let promise = sendEmail(staffRegistrationEmailTemplate(req.body.email,token))
                            promise.then(()=>console.log('mail success'))
                            .catch((err)=>console.log('mail error'))
                    }
                })
            }
        })
    }
}