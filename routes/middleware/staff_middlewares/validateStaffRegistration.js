
const validations = require('../../../src/utils/validations')
const jwt = require('jsonwebtoken')
const {Staff} = require('../../../src/config/models')


function validateStaffRegistration(req,res,next){
        if(!req.body.name || !validations.checkName(req.body.name)){return res.json({status:423,type:'name'})}
        else if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}       
        else if(!req.body.phone || !validations.isPhone(req.body.phone)){return res.json({status:423,type:'phone'})}
        else if(!req.body.token || req.body.token.length < 50){ res.json({status:423,type:'token_invalid'})}
        else{
            jwt.verify(req.body.token,process.env.STAFF_REGISTER_SECRET,(err,payload)=>{
                if(err){
                    if(err.name === 'TokenExpiredError'){
                        res.json({status:422,type:'token expire'})
                    }else{
                        res.json({status:500,type:'token server'})
                    }
                }else{
                    if(!payload.email || !validations.isEmail(payload.email)){return res.json({status:423,type:'email'})}
                    else if(!payload.admin_id || payload.admin_id.length !== 24){res.json({status:423,type:'admin_id'})}
                    else{
                        Staff.findOne({admin_id:payload.admin_id,email:payload.email},{email:1},(err,staff)=>{
                                if(err){res.json({status:500,type:'db email check'})}
                                else if(staff){res.json({status:423,type:'User Already Exists'})}
                                else{
                                    req.body.email = payload.email
                                    req.body.admin_id = payload.admin_id
                                    next()
                                }
                        })
                    }
                }
            })
        }
}


module.exports = validateStaffRegistration