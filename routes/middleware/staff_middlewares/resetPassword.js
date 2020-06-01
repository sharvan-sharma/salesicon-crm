const Staff = require('../../../src/config/models').Staff

function resetPassword(req,res,next){
    if(!req.body.email && !req.body.password){
        res.json({status:423})
    }else{
        console.log(req.body)
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