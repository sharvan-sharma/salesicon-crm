
const validations = require('../../../src/utils/validations')
const jwt = require('jsonwebtoken')

function validateAdminRegistration(req,res,next){
        if(!req.body.name || req.body.name.length <= 3){return res.json({status:423,type:'name'})}
        else if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}
        else if(!req.body.email || !validations.isEmail(req.body.email)){return res.json({status:423,type:'email'})}
        else if(!req.body.phone || !validations.isPhone(req.body.phone)){return res.json({status:423,type:'phone'})}
        else if(!req.body.token || req.body.token.length < 10 ){
            return res.json({status:423,type:'unauthorized'})
        }else{
            jwt.verify(req.body.token,process.env.GENERATE_ADMIN_SECRET,(err,payload)=>{
                if(err){res.json({status:500,type:'token'})}
                else{next()}
            })            
        }
}


module.exports = validateAdminRegistration