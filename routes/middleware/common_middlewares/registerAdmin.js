const Admin = require('../../../src/config/models').Admin


function registerAdmin(req,res,next){
            Admin.register({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    status:'IA',
                    verified:false
                },
                    req.body.password
                ,(err,document)=>{
                if(err){res.json({status:500})}
                else if(document){res.json({status:200,admin_id:document._id})}
                else{res.json({msg:'document creation failed in cb'})}
            })
}

module.exports = registerAdmin