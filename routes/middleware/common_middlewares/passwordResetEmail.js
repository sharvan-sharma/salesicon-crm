
const {Staff,Admin} = require('../../../src/config/models/index')
const mail = require('../../../src/utils/mail/index')
const passwordResetEmailTemplate = require('../../../src/utils/mail/templates/index').passwordResetEmailTemplate
const jwt =require('jsonwebtoken')
const validations = require('../../../src/utils/validations')

function passwordResetEmail(req, res, next) {
    if(!req.body.email || !validations.isEmail(req.body.email)){
        res.json({status:423,type:'email'})
    }else if(!req.body.type || !['admin','staff'].includes(req.body.type)){
        res.json({status:423,type:'type'})
    }else{
        const type = req.body.type
        const Model = (type === 'staff')?Staff:Admin
        Model.findOne({ email: req.body.email}, {name:1,verified:1,approved:1,status:1}, (err, user) => {
            if (err) {res.json({type: 'server_error',status:500})
            } else if (user) {
                if(type === 'staff' || user.verified){
                    if(type === 'staff' || user.approved){
                        if(user.status === 'A'){
                            jwt.sign({email:req.body.email},process.env.RESET_PWD_SECRET,{expiresIn:600},(err,token)=>{
                                if(err){res.json({status:500,type:'token_server_error'})}
                                else{
                                    let promise = mail.sendEmail(passwordResetEmailTemplate(req.body.email,user.name,token))
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