const Lead  = require('../../../src/config/models').Lead
const winslogger = require('../../../src/logger')

module.exports = (req,res,next) =>{
    if(!req.body.lead_id || req.body.lead_id.length !== 24){
        res.json({status:423,type:'lead_id'})
    }else if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:401,type:'unauthorised'})
    }else if(!req.body.status || !['Converted','Rejected'].includes(req.body.status)){
        res.json({status:423,type:'status'})
    }else{
        Lead.findOneAndUpdate({_id:req.body.lead_id,staff_id:req.user._id},
            {$set:{status:req.body.status,statusChangedAt:new Date()}},
            {new:true,strict:false},
            (err,lead)=>{
            if(err){
                res.json({status:500})
                winslogger.error(`${req.user.account_type} ${req.user.email} error while changing lead status`)
            }
            else if(lead){
                res.json({status:200,lead})
                winslogger.info(`${req.user.account_type} ${req.user.email} changed lead ${lead.name.firstname+''+lead.name.lastname} status to ${lead.status} `)
            }else{
                res.json({status:422,type:'lead doesnot exist'})
            }
        })
    }
}