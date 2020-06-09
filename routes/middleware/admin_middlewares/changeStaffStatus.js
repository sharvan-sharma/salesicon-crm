const {Staff} = require('../../../src/config/models')

module.exports = (req,res,next)=>{
    if(!req.user || !req.user.account_type  === 'admin'){
        res.json({status:401,type:'unauthorised'})
    }else if(!req.body.staff_id || req.body.staff_id.length !== 24){
        res.json({status:423,type:'staff_id'})
    }else if(!req.body.status || !['IA','A'].includes(req.body.status)){
        res.json({status:423,type:'status'})
    }else{
        Staff.findOneAndUpdate({admin_id:req.user._id,_id:req.body.staff_id},
            {$set:{status:req.body.status}},
            {new:true,strict:false,fields:{name:1,_id:1,email:1,phone:1,photo:1,status:1}},
            (err,staff)=>{
                if(err){res.json({status:500,type:'server error'})}
                else if(staff){res.json({status:200,staff})}
                else{res.json({status:422,type:'StaffDoesnotExist'})}
            })
    }
}