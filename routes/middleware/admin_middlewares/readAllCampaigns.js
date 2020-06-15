const {Staff,Campaigns} = require('../../../src/config/models')
const winslogger = require('../../../src/logger')

module.exports = (req,res,next) => {
    if(!req.user || req.user.account_type !== 'admin'){
        res.json({status:401,type:'Unauthorised'})
    }else{
        Staff.find({admin_id:req.user._id},
        {_id:1},
        (err,staffObjectArray)=>{
            if(err){
                res.json({status:500,type:'server error'})
                winslogger.error(`admin ${req.user.email} error while finding all staff members`)
            }
            else{
                const staffArray = staffObjectArray.map(obj=>obj._id)
                Campaigns.find({staff_id:{$in:staffArray}},(err,campaignsArray)=>{
                    if(err){
                        res.json({status:500,type:'server error'})
                        winslogger.error(`admin ${req.user.email} error while finding all campaings for staff members with ids ${staffArray}`)
                    }
                    else{res.json({status:200,campaignsArray})}
                })
            }
        })
    }
}