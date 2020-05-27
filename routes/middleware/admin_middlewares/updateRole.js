const Roles = require('../../../src/config/models').Roles

const updateRole = {
    validate:(req,res,next)=>{
        if(!req.user || !req.user.account_type === 'admin') {
            res.json({status:423,type:'unauthorised'})
        }else{
            next()
        }
    },
    name:(req,res,next)=>{
        const {role_id,role_name} = req.body
        if(!role_id || role_id.length !== 24){
            res.json({status:423,type:'role_id'})
        }else if(!role_name  || role_name.length < 3 || role_name.includes(' ')){
            res.json({status:423,type:'role_name'})
        }else{
            Roles.findOneAndUpdate({_id:role_id},{
                '$set':{
                    name:role_name
                }
            },{new:true,strict:false},(err,role)=>{
                if(err){
                    res.json({status:500})
                }else if(role){
                    res.json({status:200,updated_role_name:role.name})
                }else{
                    res.json({status:401,type:'not_found'})
                }
            })
        }
    },
    description:(req,res,next)=>{
        const {role_id,description} = req.body
        if(!role_id || role_id.length !== 24){
            res.json({status:423,type:'role_id'})
        }else{
            Roles.findOneAndUpdate({_id:role_id},{
                '$set':{
                    description:description || ''
                }
            },{new:true,strict:false},(err,role)=>{
                if(err){
                    res.json({status:500})
                }else if(role){
                    res.json({status:200,updated_role_description:role.description})
                }else{
                    res.json({status:401,type:'not_found'})
                }
            })
        }
    },
    status:(req,res,next)=>{
        const {role_id,status} = req.body
        if(!role_id || role_id.length !== 24){
            res.json({status:423,type:'role_id'})
        }else if(!status || !['IA','A'].includes(status.toUpperCase())){
            res.json({status:423,type:'status'})
        }else{
            Roles.findOneAndUpdate({_id:role_id},{
                '$set':{status:status}
            },{new:true,strict:false},(err,role)=>{
                if(err){
                    res.json({status:500})
                }else if(role){
                    res.json({status:200,updated_role_status:role.status})
                }else{
                    res.json({status:401,type:'not_found'})
                }
            })
        }
    }
}

module.exports = updateRole