
const Staff = require('../../../src/config/models/index').Staff
const mail = require('../../../src/utils/mail/index')
const passwordResetEmailTemplate = require('../../../src/utils/mail/templates/index').passwordResetEmailTemplate
const jwt =require('jsonwebtoken')
const validations = require('../../../src/utils/validations')

function passwordResetEmail(req, res, next) {
    if(!req.body.email || !validations.isEmail(req.body.email)){
        res.json({status:423,type:'email'})
    }else{
        Staff.findOne({ email: req.body.email}, {name:1,verified:1,approved:1,status:1}, (err, staff) => {
            if (err) {res.json({type: 'server_error',status:500})
            } else if (staff) {
                if(staff.verified){
                    if(staff.approved){
                        if(staff.status === 'A'){
                            jwt.sign({email:req.body.email},process.env.RESET_PWD_SECRET,{expiresIn:600},(err,token)=>{
                                if(err){res.json({status:500,type:'token_server_error'})}
                                else{
                                    let promise = mail.sendEmail(passwordResetEmailTemplate(req.body.email,staff.name,token))
                                    promise.then(result=>res.json({status:200,msg:'mail sent'}))
                                    .catch(err=>res.json({status:500,type:'mail_server_error'}))
                                }
                            })
                        }else{res.json({status: 455,type:'inactive'})}
                    }else{res.json({status: 422,type:'approved'})}
                }else{res.json({status: 422,type:'verified'})}
            } else {res.json({type:'user_doesnot_exist',status:401})}
        })
    }
}

module.exports = passwordResetEmail