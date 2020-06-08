const {Staff,Admin} = require('../../../src/config/models')
const validations = require('../../../src/utils/validations')

async function resetPassword(req,res,next){
    if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}
    else if(!req.body.email || !validations.isEmail(req.body.email)){return res.json({status:423,type:'email'})}
    else if(!req.body.type || !['admin','staff'].includes(req.body.type)){res.json({status:423,type:'type'})}
    else{
        const {email,password,type} = req.body
        const Model = (type === 'staff')?Staff:Admin
        Model.findOne({email})
       .then((user)=>{
            user.setPassword(password,(err,u)=>{
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