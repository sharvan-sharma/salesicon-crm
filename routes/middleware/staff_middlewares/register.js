const Staff = require('../../../src/config/models').Staff


function register(req,res,next){
            Staff.register({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    status:'IA',
                    admin_id:req.body.admin_id,
                    login_status:'IA'  
                },
                    req.body.password
                ,(err,staff)=>{
                if(err){res.json({status:500})}
                else if(staff){next()}   
                else{res.json({msg:'document creation failed in cb'})}
            })
}

module.exports = register