const Lead = require('../../../src/config/models').Lead


module.exports = (req,res,next)=>{
    if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:423,type:'unauthorised'})
    }else{
        Lead.find({staff_id:req.user._id},{staff_id:0},(err,leadsArray)=>{
            if(err){res.json({status:500})}
            else{res.json({status:200,leadsArray})}
        })
    }
}