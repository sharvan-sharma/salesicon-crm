const {Staff} = require('../../../src/config/models')
const winslogger = require('../../../src/logger')

module.exports = (req,res,next) => {
    if(!req.user || req.user.account_type !== 'admin'){
        res.json({status:401,type:'Unauthorised'})
    }else{
        Staff.find({admin_id:req.user._id},
        {name:1,email:1,phone:1,photo:1,status:1,createdAt:1},
        (err,staffArray)=>{
            if(err){
                res.json({status:500,type:'server error'})
                winslogger.error(`admin ${req.user.email} error while finding all staff members`)
            }
            else{res.json({status:200,staffArray})}
        })
    }
}