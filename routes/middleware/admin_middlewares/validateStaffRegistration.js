
const validations = require('../../../src/utils/validations')


function validateStaffRegistration(req,res,next){
        if(!req.body.name || req.body.name.length <= 3){return res.json({status:423,type:'name'})}
        else if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}
        else if(!req.body.email || !validations.isEmail(req.body.email)){return res.json({status:423,type:'email'})}
        else if(!req.body.phone || !validations.isPhone(req.body.phone)){return res.json({status:423,type:'phone'})}
        else if(!req.isAuthenticated() || req.user.account_type !== 'admin' ){
            return res.json({status:423,type:'unauthorized'})
        }else{
            next()
        }
}


module.exports = validateStaffRegistration