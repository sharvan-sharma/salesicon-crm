const {Lead} = require('../../../src/config/models')
const mongoose = require('mongoose')
const winslogger = require('../../../src/logger')

module.exports = (req,res,next)=>{
    if(!req.user || req.user.account_type !== 'admin'){
        res.json({status:401,type:'unauthorised'})
    }else if(!req.body.type){
        res.json({status:423,type:'type'})
    }else if(req.body.type !== 'all' && (!req.body._id || req.body._id.length !== 24)){
        res.json({status:423,type:'_id'})
    }else{
        const obj = {}
        if(req.body.type !== 'all'){
            obj[(req.body.type === 'staffs')?'staff_id':'campaign_id'] = req.body._id
        }
        obj['statusChangedAt'] = {
            $gte:new Date(req.body.mindate),$lt:new Date(req.body.maxdate)
        }
        Lead.aggregate([
            {$match:(req.body.type === 'all')?{}:obj},
            {$group:{_id:'$status',count:{$sum:1}}}
        ]).exec((err,dataset)=>{
            if(err){
                res.json({status:500})
                winslogger.error(`admin ${req.user.email} error while getting conversion info for ${req.body.type} id as ${req.body._id}`)
            }
            else{
                res.json({status:200,dataset})
            }
        })
    }
}