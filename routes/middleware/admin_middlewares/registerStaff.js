
const Staff = require('../../../src/config/models').Staff


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
                else if(document){res.json({status:200,staff_id:document._id})}
                else{res.json({msg:'document creation failed in cb'})}
            })
}

module.exports = registerStaff