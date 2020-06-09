const Staff = require('../../../src/config/models').Staff

module.exports = (req,res,next)=>{
    if(!req.body.status || !['IA','A'].includes(req.body.status)){
        res.json({status:423,type:'status'})
    }else if(!req.body.staff_id && req.body.staff_id.length !== 24){
        res.json({status:423,type:'staff_id'})
    }else if(!req.user || req.user.account_type !== 'admin'){
        res.json({status:401,type:'unauthorized'})
    }else{
        Staff.findOneAndUpdate({_id:req.body.staff_id,admin_id:req.user._id},{'$set':{status:req.body.status}},{new:true,strict:false},
        (err,staff)=>{
            if(err){res.json({status:500,type:'server_error'})}
            else if(staff){res.json({status:200,staff})}
            else{res.json({status:422,type:'staff_doesnot_exist'})}
        })
    }
}