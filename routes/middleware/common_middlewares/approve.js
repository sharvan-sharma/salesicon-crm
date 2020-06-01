const Staff = require('../../../src/config/models').Staff
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
        if(!req.body.token || req.body.token.length < 10){
            res.json({status:423,type:'invalid_token'})
        }else{
            jwt.verify(req.body.token,process.env.STAFF_APPROVAL_SECRET,(err,payload)=>{
                if(err){res.json({status:423,type:'invalid_token'})}
                else{
                    Staff.findOneAndUpdate({_id:id},{'$set':{approved:true}},{new:true,strict:false},(err,staff)=>{
                        if(err){res.json({status:500})}
                        else if(staff){
                            res.json({status:200,msg:'Approved,From Now You can Signin'})
                        }else{
                            res.json({status:401})
                        }
                    })
                }
            })
        }
}