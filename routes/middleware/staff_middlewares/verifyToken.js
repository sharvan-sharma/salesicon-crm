const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    if(!req.body.token || req.body.token.length < 50){
        res.json({status:423,type:'token_invalid'})
    }else{
        jwt.verify(req.body.token,process.env.STAFF_REGISTER_SECRET,(err,payload)=>{
            if(err){
                if(err.name === 'TokenExpiredError'){
                    res.json({status:422,type:'token expire'})
                }else{
                    res.json({status:500,type:'token server'})
                }
            }else{res.json({status:200,...payload})}
        })
    }
}