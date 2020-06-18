const Staff = require('../../../src/config/models').Staff
const winslogger = require('../../../src/logger')

function register(req,res,next){
            Staff.register({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    admin_id:req.body.admin_id 
                },
                    req.body.password
                ,(err,staff)=>{
                if(err){
                    res.json({status:500})
                    winslogger.error(`staff  error while registereing staff with email ${req.body.email}`)
                }
                else if(staff){
                    winslogger.info(`staff  sucessfully registerd staff with email ${req.body.email}`)
                    next()
                }   
                else{res.json({msg:'document creation failed in cb'})}
            })
}

module.exports = register