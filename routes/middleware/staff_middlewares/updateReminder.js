const  {Lead} = require('../../../src/config/models')
const winslogger = require('../../../src/logger')

module.exports = (req,res,next)=>{
    if(!req.body.lead_id || req.body.lead_id.length !== 24){
        res.json({status:423,type:'lead_id'})
    }else if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:401,type:'unauthorised'})
    }else{
    Lead.findOneAndUpdate({_id:req.body.lead_id,staff_id:req.user._id},
        {$set:{
            rem_date:req.body.rem_date
        }},
        {new:true,strict:false},
        (err,lead)=>{
            if(err){
                res.json({status:500})
                winslogger.error(`staff ${req.user.email} error ocured whle updating reminder for lead_id ${req.body.lead_id}`)
            }
            else if(lead){
                res.json({status:200,lead})
            }else{
                res.json({status:422,type:'lead doesnot exist'})
            }
        })
    }
}