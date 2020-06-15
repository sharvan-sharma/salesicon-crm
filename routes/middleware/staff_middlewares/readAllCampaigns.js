const Campaigns = require('../../../src/config/models').Campaigns
const winslogger = require('../../../src/logger')


module.exports =(req,res,next)=>{
    if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:423,type:'unauthorised'})
    }else{
        Campaigns.find({staff_id:req.user._id},{staff_id:0},(err,campaignsArray)=>{
            if(err){
                res.json({status:500})
                winslogger.error(`staff ${req.user.email} error while reading all campaigns`)
            }
            else{res.json({status:200,campaignsArray})}
        })
    }
}



