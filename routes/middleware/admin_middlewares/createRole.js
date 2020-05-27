
const Roles = require('../../../src/config/models').Roles

function createRole(req,res,next){
    if(!req.body.role_name || req.body.role_name < 3 || req.body.role_name.includes(' ')){
        res.json({status:423,type:'role_name'})
    }else if(req.user.account_type !== 'admin'){
        res.json({status:423,type:'unauthorized'})
    }else{
        Roles.create({
            name:req.body.role_name,
            status:'A',
            description:req.body.description || ''
        },(err,role)=>{
            if(err){res.jons({status:500})}
            else{res.json({status:200,role_id:role._id})}            
        })
    }
}

module.exports = createRole
