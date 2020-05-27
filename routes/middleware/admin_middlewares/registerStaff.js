
const models = require('../../../src/config/models')
const {Staff,StaffRole} = models


function registerStaff(req,res,next){
            Staff.register({
                    admin_id:req.user._id,
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    status:'IA',
                    verified:false,  
                },
                    req.body.password
                ,(err,document)=>{
                if(err){res.json({status:500})}
                else if(document){
                    StaffRole.create({staff_id:document._id,role_id:req.body.role_id},(err,staffrole)=>{
                         if(err){res.json({status:500})}
                         else{
                            res.json({status:200,staff_id:document._id,staff_role_id:staffrole._id})
                         }
                    })
                }   
                else{res.json({msg:'document creation failed in cb'})}
            })
}

module.exports = registerStaff