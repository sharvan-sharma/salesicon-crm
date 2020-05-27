const jwt = require('jsonwebtoken')

function generateAdminToken(req,res,next){
    jwt.sign({},process.env.GENERATE_ADMIN_SECRET,{expiresIn:600},(err,token)=>{
        if(err){
            res.json({status:500})
        }else{
            res.json({
                status:200,token
            })
        }
    })
}

module.exports = generateAdminToken