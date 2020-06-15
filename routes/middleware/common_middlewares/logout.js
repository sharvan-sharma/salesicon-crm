const {Admin,Staff} = require('../../../src/config/models')
const winslogger = require('../../../src/logger')

module.exports = (req,res,next)=>{
if(req.isAuthenticated()){

    const Model = (req.user.account_type === 'admin')?Admin:Staff
    Model.findOneAndUpdate({_id:req.user._id},{$set:{login_status:'IA'}},(err,user)=>{
        if(err){
            res.json({status:500})
            winslogger.error(`${req.user.account_type} ${req.user.email} error while logging out`)
        }else{
            let {account_type,email} = req.user
            req.logout()
            res.json({status:200,logged_in:false,name:null,email:null,account_type:null,photo:null,createdAt:null})
            winslogger.info(`${account_type} ${email} succesfully logout and login_status set to 'IA'`)
        }
    })

}else{
    res.json({status:401,msg:'login first to logout'})
}
}