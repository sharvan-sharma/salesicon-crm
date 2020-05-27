
const Products  = require('../../../src/config/models').Products

const updateProduct = {
    validate:(req,res,next)=>{
        if(!req.user || !req.user.account_type === 'admin') {
            res.json({status:423,type:'unauthorised'})
        }else{
            next()
        }
    },
    name:(req,res,next)=>{
        const {product_id,product_name} = req.body
        if(!product_id || product_id.length !== 24){
            res.json({status:423,type:'product_id'})
        }else if(!product_name  || product_name.length < 3 || product_name.includes(' ')){
            res.json({status:423,type:'product_name'})
        }else{
            Products.findOneAndUpdate({_id:product_id},{
                '$set':{
                    name:product_name
                }
            },{new:true,strict:false},(err,product)=>{
                if(err){
                    res.json({status:500})
                }else if(product){
                    res.json({status:200,update_product_name:product.name})
                }else{
                    res.json({status:401,type:'not_found'})
                }
            })
        }
    },
    description:(req,res,next)=>{
        const {product_id,description} = req.body
        if(!product_id || product_id.length !== 24){
            res.json({status:423,type:'product_id'})
        }else{
            Products.findOneAndUpdate({_id:product_id},{
                '$set':{
                    description:description || ''
                }
            },{new:true,strict:false},(err,product)=>{
                if(err){
                    res.json({status:500})
                }else if(product){
                    res.json({status:200,update_product_description:product.description})
                }else{
                    res.json({status:401,type:'not_found'})
                }
            })
        }
    },
    status:(req,res,next)=>{
        const {product_id,status} = req.body
        if(!product_id || product_id.length !== 24){
            res.json({status:423,type:'product_id'})
        }else if(!status || !['IA','A'].includes(status.toUpperCase())){
            res.json({status:423,type:'status'})
        }else{
            Products.findOneAndUpdate({_id:product_id},{
                '$set':{status:status}
            },{new:true,strict:false},(err,product)=>{
                if(err){
                    res.json({status:500})
                }else if(product){
                    res.json({status:200,update_product_status:product.status})
                }else{
                    res.json({status:401,type:'not_found'})
                }
            })
        }
    }
}

module.exports = updateProduct