
const validations = require('../../../src/utils/validations')
const jwt = require('jsonwebtoken')

function validateAdminRegistration(req,res,next){
        if(!req.body.name || req.body.name.length <= 3){return res.json({status:423,type:'name'})}
        else if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}
        else if(!req.body.email || !validations.isEmail(req.body.email)){return res.json({status:423,type:'email'})}
        else if(!req.body.phone || !validations.isPhone(req.body.phone)){return res.json({status:423,type:'phone'})}
        else{
               next()           
        }
}


module.exports = validateAdminRegistration