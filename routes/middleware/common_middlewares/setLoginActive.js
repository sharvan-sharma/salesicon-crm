
const {Staff,Admin} = require('../../../src/config/models')

module.exports = (req,res,next)=>{
    if(req.isAuthenticated()){
        const Model = (req.user.account_type === 'staff')?Staff:Admin
        Model.findOneAndUpdate({_id:req.user._id},{'$set':{login_status:'A'}},{new:true,strict:false},(err,user)=>{
            if(err){res.json({status:500,type:'server_error'})
            }else if(user){
                res.json({  status:200,
                            logged_in:true,
                            name:req.user.name,
                            email:req.user.email,
                            createdAt:req.user.createdAt,
                            phone:req.user.phone,
                            photo:req.user.photo,
                            account_type:req.user.account_type})
            }else{res.json({status:401,type:'unauthenticated'})}
        })
    }else{res.json({status:401,type:'unauthenticated'})}
}