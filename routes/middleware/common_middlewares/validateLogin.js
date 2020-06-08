const {Staff,Admin} = require('../../../src/config/models')
const validations = require('../../../src/utils/validations')

module.exports = (req,res,next)=>{
    if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}
    else if(!req.body.email || !validations.isEmail(req.body.email)){return res.json({status:423,type:'email'})}
    else if(!req.body.type || !['admin','staff'].includes(req.body.type)){res.json({status:423,type:'type'})}
    else{
        const type = req.body.type
        const Model = (type === 'admin')?Admin:Staff
        Model.findOne({email:req.body.email},{verified:1,approved:1,status:1},(err,user)=>{
            if(err){req.json({status:500,type:'server_error'})}
            else if(user){
                if(type === 'staff' || user.verified){
                    if(type === 'staff' || user.approved){
                        if(user.status === 'A'){
                            next()
                        }else{
                            res.json({status:455,type:'inactive'})
                        }
                    }else{
                        res.json({status:422,type:'approved'})
                    }
                }else{
                    res.json({status:422,type:'verified'})
                }
            }
            else{res.json({status:401,type:'user_doesnot_exist'})}
        })
    }
        
}
