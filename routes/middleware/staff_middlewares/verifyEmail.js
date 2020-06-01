const Staff = require('../../../src/config/models').Staff
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
     if(!req.body.token || req.body.token.length < 10){
            res.json({status:423,type:'invalid_token'})
        }else{
            jwt.verify(req.body.token,process.env.STAFF_VERIFY_SECRET,(err,payload)=>{
                if(err){
                    if(err.name ===  'TokenExpiredError'){
                        Staff.findOneAndRemove({_id:payload.id},(err,staff)=>{
                            if(err){res.json({status:500,type:'token_staff_del_error'})}
                            else if(staff){res.json({status:422,error:'token_exipred'})}
                            else{res.json({status:422,error:'token_already_used'})}
                        })
                    }else{res.json({error:'server_error',status:500})}
                }
                else{
                    Staff.findOneAndUpdate({_id:payload.id},{'$set':{verified:true}},{new:true,strict:false},(err,staff)=>{
                        if(err){res.json({status:500})}
                        else if(staff){
                            res.json({status:200,msg:'verified'})
                        }else{
                            res.json({status:401})
                        }
                    })
                }
            })
        }
}