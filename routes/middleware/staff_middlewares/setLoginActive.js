
const Staff = require('../../../src/config/models').Staff

module.exports = (req,res,next)=>{
    if(req.isAuthenticated()){
        Staff.findOneAndUpdate({_id:req.user._id},{'$set':{login_status:'A'}},{new:true,strict:false},(err,staff)=>{
            if(err){res.json({status:500,type:'server_error'})
            }else if(staff){
                res.json({status:200,logged_in:true,id:req.user._id,name:req.user.name,email:req.user.email,phone:req.user.phone,photo:req.user.photo})
            }else{res.json({status:401,type:'unauthenticated'})}
        })
    }else{res.json({status:401,type:'unauthenticated'})}
}