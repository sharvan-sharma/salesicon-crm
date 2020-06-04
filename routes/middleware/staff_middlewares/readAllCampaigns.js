const Campaigns = require('../../../src/config/models').Campaigns


module.exports =(req,res,next)=>{
    if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:423,type:'unauthorised'})
    }else{
        Campaigns.find({staff_id:req.user._id},{staff_id:0},(err,campaignsArray)=>{
            if(err){res.json({status:500})}
            else{res.json({status:200,campaignsArray})}
        })
    }
}



