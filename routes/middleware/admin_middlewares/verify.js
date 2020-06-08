const {Admin} = require('../../../src/config/models')
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
        if(!req.body.token || req.body.token.length < 10){
            res.json({status:423,type:'invalid_token'})
        }else if(!req.body.type){
            res.json({status:423,type:'invalid_type'})
        }else{
            let secret = (req.body.type === 'verified')?process.env.ADMIN_VERIFY_SECRET:process.env.ADMIN_APPROVAL_SECRET
            jwt.verify(req.body.token,secret,(err,payload)=>{
                if(err){
                    if(err.name ===  'TokenExpiredError'){
                        res.json({status:422,error:'token_exipred'})
                    }else{res.json({type:'token_server_error',status:500})}
                }else{
                    Admin.findOneAndUpdate({_id:payload.id},
                                            {'$set':(req.body.type === 'verified')?{verified:true}:{status:'A',approved:true}},
                                            {new:true,strict:false},
                                            (err,admin)=>{
                                            if(err){res.json({status:500})}
                                            else if(admin){
                                                res.json({status:200,msg:req.body.type})
                                            }else{
                                                res.json({status:422})
                                            }
                    })
                }
            })
        }
}