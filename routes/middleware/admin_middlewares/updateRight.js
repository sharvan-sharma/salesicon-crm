const Rights = require('../../../src/config/models').Rights
const screens = require('./updateRightScreens')

const updateRight = {
     validate:(req,res,next)=>{
        if(!req.user || !req.user.account_type === 'admin') {
            res.json({status:423,type:'unauthorised'})
        }else{
            next()
        }
    },
    name:(req,res,next)=>{
        const {right_id,right_name} = req.body
        if(!right_id || right_id.length !== 24){
            res.json({status:423,type:'right_id'})
        }else if(!right_name  || right_name.length < 3 || right_name.includes(' ')){
            res.json({status:423,type:'right_name'})
        }else{
            Rights.findOneAndUpdate({_id:right_id},{
                '$set':{
                    name:right_name
                }
            },{new:true,strict:false},(err,right)=>{
                if(err){
                    res.json({status:500})
                }else if(right){
                    res.json({status:200,updated_right_name:right.name})
                }else{
                    res.json({status:401,type:'not_found'})
                }
            })
        }
    },
    description:(req,res,next)=>{
        const {right_id,description} = req.body
        if(!right_id || right_id.length !== 24){
            res.json({status:423,type:'right_id'})
        }else{
            Roles.findOneAndUpdate({_id:right_id},{
                '$set':{
                    description:description || ''
                }
            },{new:true,strict:false},(err,right)=>{
                if(err){
                    res.json({status:500})
                }else if(right){
                    res.json({status:200,updated_right_description:right.description})
                }else{
                    res.json({status:401,type:'not_found'})
                }
            })
        }
    },
    status:(req,res,next)=>{
        const {right_id,status} = req.body
        if(!right_id || right_id.length !== 24){
            res.json({status:423,type:'right_id'})
        }else if(!status || !['IA','A'].includes(status.toUpperCase())){
            res.json({status:423,type:'status'})
        }else{
            Roles.findOneAndUpdate({_id:right_id},{
                '$set':{status:status}
            },{new:true,strict:false},(err,right)=>{
                if(err){
                    res.json({status:500})
                }else if(right){
                    res.json({status:200,updated_right_status:right.status})
                }else{
                    res.json({status:401,type:'not_found'})
                }
            })
        }
    },
    screens
}

module.exports = updateRight