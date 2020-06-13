const Lead = require('../../../src/config/models').Lead


module.exports = (req,res,next)=>{
    if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:423,type:'unauthorised'})
    }else if(!req.body.type || !['t-calls','leads'].includes(req.body.type)){
        res.json({status:423,type:'table type'})
    }else{
        const conditionsObject = {staff_id:req.user._id}
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()
        if(req.body.type === 't-calls'){
            conditionsObject['rem_date'] = {$lt:new Date(year,month,day+1),$gte:new Date(year,month,day)}
        }
        Lead.find(conditionsObject,{staff_id:0},(err,leadsArray)=>{
            if(err){res.json({status:500})}
            else{res.json({status:200,leadsArray})}
        })
    }
}