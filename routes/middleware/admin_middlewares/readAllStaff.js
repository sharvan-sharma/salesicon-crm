const {Staff} = require('../../../src/config/models')

module.exports = (req,res,next) => {
    if(!req.user || req.user.account_type !== 'admin'){
        res.json({status:401,type:'Unauthorised'})
    }else{
        Staff.find({admin_id:req.user._id},
        {name:1,email:1,phone:1,photo:1,status:1},
        (err,staffArray)=>{
            if(err){res.json({status:500,type:'server error'})}
            else{res.json({status:200,staffArray})}
        })
    }
}