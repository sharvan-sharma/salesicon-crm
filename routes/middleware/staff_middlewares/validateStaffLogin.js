const Staff = require('../../../src/config/models').Staff
const validations = require('../../../src/utils/validations')

module.exports = (req,res,next)=>{
    if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}
    else if(!req.body.email || !validations.isEmail(req.body.email)){return res.json({status:423,type:'email'})}
    else{
        Staff.findOne({email:req.body.email},{verified:1,approved:1,status:1},(err,staff)=>{
            if(err){req.json({status:500,type:'server_error'})}
            else if(staff){
                if(staff.verified){
                    if(staff.approved){
                        if(staff.status === 'A'){
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
