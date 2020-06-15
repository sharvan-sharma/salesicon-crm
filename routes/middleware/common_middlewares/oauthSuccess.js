const {Admin} = require('../../../src/config/models')
const winslogger = require('../../../src/logger')

module.exports = (req,res,next)=>{
    if(req.isAuthenticated()){
            Admin.findOneAndUpdate({_id:req.user._id},{'$set':{login_status:'A'}},{new:true,strict:false},(err,user)=>{
                if(err){res.json({status:500,type:'server_error'})
                }else {

                     res.status(302).redirect(process.env.FRONT_DOMAIN)
                     winslogger.info(`admin ${req.user.email} login through google oauth`)
                }
            })
    }else{
        res.status(302).redirect(process.env.FRONT_DOMAIN+'/oauth')
    }
}