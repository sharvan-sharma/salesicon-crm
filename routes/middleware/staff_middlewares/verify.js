const Staff = require('../../../src/config/models').Staff
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
        if(!req.body.token || req.body.token.length < 10){
            res.json({status:423,type:'invalid_token'})
        }else if(!req.body.type){
            res.json({status:423,type:'invalid_type'})
        }else{
            let secret = (req.body.type === 'verified')?process.env.STAFF_VERIFY_SECRET:process.env.STAFF_APPROVAL_SECRET
            jwt.verify(req.body.token,secret,(err,payload)=>{
                if(err){
                    if(err.name ===  'TokenExpiredError'){
                        res.json({status:422,error:'token_exipred'})
                    }else{res.json({type:'token_server_error',status:500})}
                }else{
                    Staff.findOneAndUpdate({_id:payload.id},
                                            {'$set':(req.body.type === 'verified')?{verified:true}:{status:'A',approved:true}},
                                            {new:true,strict:false},
                                            (err,staff)=>{
                                            if(err){res.json({status:500})}
                                            else if(staff){
                                                res.json({status:200,msg:req.body.type})
                                            }else{
                                                res.json({status:422})
                                            }
                    })
                }
            })
        }
}