const {Admin,Staff} = require('../../../src/config/models')
const winslogger = require('../../../src/logger')
const validations = require('../../../src/utils/validations')

module.exports = (req,res,next)=>{
    if(!req.user){
        res.json({status:401,type:'unauthorised'})
    }else if(!req.body.type || !['name','phone'].includes(req.body.type)){
        res.json({status:423,type:'update operation type not mentioned'})
    }else if(req.body.type === 'name' && (!req.body.name || !validations.checkName(req.body.name))){
        res.json({status:423,type:'name'})
    }else if(req.body.type === 'phone' && (!req.body.phone || !validations.isPhone(req.body.phone))){
        res.json({status:423,type:'phone'})
    }else{
        const Model = (req.user.account_type === 'admin')?Admin:Staff
        const updateObject = (req.body.type === 'name')?{name:req.body.name}:{phone:req.body.phone}
        Model.findOneAndUpdate({_id:req.user._id},{
            $set:updateObject
        },{new:true,strict:false},(err,user)=>{
            if(err){
                res.json({status:500})
                winslogger.error(`${req.user.account_type} ${req.user.email} error while updating ${req.body.type}`)
            }else if(user){
                if(req.body.type === 'name'){
                    res.json({status:200,name:user.name})
                }else{
                    res.json({status:200,phone:user.phone})
                }
                winslogger.info(`${req.user.account_type} ${req.user.email} successfully updated ${req.body.type}`)
            }else{
                res.json({status:422,type:'useDoesnotExist'})
            }
        })
    }
}