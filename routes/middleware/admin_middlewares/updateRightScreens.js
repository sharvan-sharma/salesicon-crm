const Rights = require('../../../src/config/models').Rights

const screens = {
        add:(req,res,next)=>{
            const {right_id,screens_uri_array} = req.body
            if(!right_id || right_id.length !== 24){
                res.json({status:423,type:'right_id'})   
            }else if(!screens_uri_array || typeof screens_uri_array !== Array || screens_uri_array.length === 0){
                res.json({status:423,type:'screens_uri_array'})
            }else{
                Rights.findOneAndUpdate({_id:right_id},
                    {'$push':{
                        screens:{$each:screens_uri_array}
                    }
                },
                {new:true,strict:false},(err,right)=>{
                    if(err){res.json({status:500})}
                    else if(right){res.json({status:200,update_right_screens:right.screens})}
                    else {res.json({status:401,type:'not_found'})}
                })
            }
        },
        removeOne:(req,res,next)=>{
            const {right_id,screen_id} = req.body
            if(!right_id || right_id.length !== 24){
                res.json({status:423,type:'right_id'})   
            }else if(!screen_id || screen_id.length !== 24){
                res.json({status:423,type:'screen_id'})
            }else{
                Rights.findOneAndUpdate({_id:right_id},
                    {'$pull':{
                        screens:{_id:screen_id}
                    }
                },
                {new:true,strict:false},(err,right)=>{
                    if(err){res.json({status:500})}
                    else if(right){res.json({status:200,update_right_screens:right.screens})}
                    else {res.json({status:401,type:'not_found'})}
                })
            }
        },
        removeMultiple:(req,res,next)=>{
            const {right_id,screens_id_array} = req.body
            if(!right_id || right_id.length !== 24){
                res.json({status:423,type:'right_id'})   
            }else if(!screens_id_array || typeof screens_id_array !== Array || screens_id_array.length === 0){
                res.json({status:423,type:'screens_id_array'})
            }else{
                Rights.findOneAndUpdate({_id:right_id},
                    {'$pull':{
                        screens:{_id:{$in:screens_id_array}}
                    }
                },
                {new:true,strict:false},(err,right)=>{
                    if(err){res.json({status:500})}
                    else if(right){res.json({status:200,update_right_screens:right.screens})}
                    else {res.json({status:401,type:'not_found'})}
                })
            }
        },
        removeAll:(req,res,next)=>{
            const {right_id} = req.body
            if(!right_id || right_id.length !== 24){
                res.json({status:423,type:'right_id'})   
            }else{
                Rights.findOneAndUpdate({_id:right_id},
                    {'$set':{
                        screens:[]
                    }
                },
                {new:true,strict:false},(err,right)=>{
                    if(err){res.json({status:500})}
                    else if(right){res.json({status:200,update_right_screens:right.screens})}
                    else {res.json({status:401,type:'not_found'})}
                })
            }
        }
}

module.exports = screens