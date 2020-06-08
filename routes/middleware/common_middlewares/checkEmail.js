const validations = require('../../../src/utils/validations')
const {Staff,Admin} = require('../../../src/config/models')

module.exports = (req,res,next)=>{
    if(!req.body.email || !validations.isEmail(req.body.email)){
        res.json({status:423,type:'email'})
    }else if(!req.body.type || !['admin','staff'].includes(req.body.type)){
        res.json({status:423,type:'type'})
    }else{
        const type = req.body.type
        const Model = (type === 'staff')?Staff:Admin
        Model.findOne({email:req.body.email},{email:1},(err,staff)=>{
            if(err){res.json({type:500})}
            else if(staff){res.json({status:422,type:'already_exists'})}
            else{res.json({status:200})}
        })
    }
}