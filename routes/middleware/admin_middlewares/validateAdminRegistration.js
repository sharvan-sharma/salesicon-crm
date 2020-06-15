
const validations = require('../../../src/utils/validations')
const {Admin}= require('../../../src/config/models')
const winslogger  = require('../../../src/logger')

function validateAdminRegistration(req,res,next){
        if(!req.body.name || req.body.name.length <= 3){return res.json({status:423,type:'name'})}
        else if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}
        else if(!req.body.email || !validations.isEmail(req.body.email)){return res.json({status:423,type:'email'})}
        else if(!req.body.phone || !validations.isPhone(req.body.phone)){return res.json({status:423,type:'phone'})}
        else{
                Admin.findOne({email:req.body.email},{email:1},(err,admin)=>{
                        if(err){
                                res.json({status:500,type:'db email check'})
                                winslogger.error(`admin ${req.body.email} error while checking existance of admin with given credentials`)
                        }
                        else if(admin){res.json({status:423,type:'User Already Exists'})}
                        else{next()}
                })
        }
}


module.exports = validateAdminRegistration