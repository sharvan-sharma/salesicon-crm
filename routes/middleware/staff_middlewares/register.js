const Staff = require('../../../src/config/models').Staff


function register(req,res,next){
            Staff.register({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    admin_id:req.body.admin_id 
                },
                    req.body.password
                ,(err,staff)=>{
                if(err){res.json({status:500})}
                else if(staff){next()}   
                else{res.json({msg:'document creation failed in cb'})}
            })
}

module.exports = register