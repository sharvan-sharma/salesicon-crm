const models  = require('../../../src/config/models')
const winslogger = require('../../../src/logger')

const LeadInteractions = models.LeadInteractions
const LeadResponse = models.LeadResponse


module.exports = async (req,res,next)=>{
    if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:423,type:'unauthorised'})
    }else if(!req.body.lead_id || req.body.lead_id.length !== 24){
        res.json({status:423,type:'lead_id'})
    }else{
        try{
            const leadInteractionsArray = await LeadInteractions.find({customer_id:req.body.lead_id,staff_id:req.user._id},{staff_id:0}).populate('response_id')
            res.json({status:200,leadInteractionsArray})
            winslogger.info(`staff ${req.user.email} successfully read interactions for lead_id ${req.body.lead_id}`)
        }catch(e){
            res.json({status:500,type:'lead_interactions'})
            winslogger.error(`staff ${req.user.email}error while reading interactions for lead_id ${req.body.lead_id}`)
        }
    }
}