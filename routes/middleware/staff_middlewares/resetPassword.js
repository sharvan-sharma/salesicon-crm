const Staff = require('../../../src/config/models').Staff
const validations = require('../../../src/utils/validations')

async function resetPassword(req,res,next){
    if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}
    else if(!req.body.email || !validations.isEmail(req.body.email)){return res.json({status:423,type:'email'})}
    else{
        const {email,password} = req.body
        Staff.findOne({email})
       .then((staff)=>{
            staff.setPassword(password,(err,u)=>{
                if(err){
                    res.json({status:500})
                }else{
                    u.save(()=>{
                        next()
                    }) 
                }
            })
        }).catch(err=>{
            res.json({status:500})
        })
    }
}

module.exports = resetPassword