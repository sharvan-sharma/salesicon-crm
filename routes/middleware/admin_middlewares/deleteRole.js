const Roles = require('../../../src/config/models').Roles


function deleteRole(req,res,next){
    if(!req.body.role_id){
        res.json({status:423,type:'role_id'})
    }else{
        if(req.user.account_type === 'admin'){
            Roles.findOneAndDelete({
                _id:req.body.role_id
            },(err,role)=>{
                if(err){
                    res.json({status:500})
                }else{
                    res.json({status:200,deleted_role_id:role._id})
                }
            })
        }else{
            res.json({status:403,type:'unauthorized'})
        }
    }
}

module.exports = deleteRole