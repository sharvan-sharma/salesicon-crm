
const Products  = require('../../../src/config/models').Products
const winslogger = require('../../../src/logger')

const updateProduct = {
    validate:(req,res,next)=>{
        if(!req.user || !req.user.account_type === 'admin') {
            res.json({status:423,type:'unauthorised'})
        }else{
            next()
        }
    },
    updateNameAndDescription:(req,res,next)=>{
        const {product_id,product_name,description} = req.body
        if(!product_id || product_id.length !== 24){
            res.json({status:423,type:'product_id'})
        }else if(!product_name  || product_name.length < 3 || product_name.includes(' ')){
            res.json({status:423,type:'product_name'})
        }else{
            Products.findOneAndUpdate({_id:product_id,admin_id:req.user._id},{
                '$set':{
                    name:product_name,
                    description:description || ''
                }
            },{new:true,strict:false},(err,product)=>{
                if(err){
                    res.json({status:500})
                    winslogger.error(`admin ${req.user.email} error while changing name,description of product with id ${product_id}`)
                }else if(product){
                    res.json({status:200,product})
                }else{
                    res.json({status:422,type:'not_found'})
                }
            })
        }
    },
    updateStatus:(req,res,next)=>{
        const {product_id,status} = req.body
        if(!product_id || product_id.length !== 24){
            res.json({status:423,type:'product_id'})
        }else if(!status || !['IA','A'].includes(status.toUpperCase())){
            res.json({status:423,type:'status'})
        }else{
            Products.findOneAndUpdate({_id:product_id,admin_id:req.user._id},{
                '$set':{status:status}
            },{new:true,strict:false},(err,product)=>{
                if(err){
                    res.json({status:500})
                    winslogger.error(`admin ${req.user.email} error while changing status of product with id ${product_id} to ${status}`)
                }else if(product){
                    res.json({status:200,product})
                }else{
                    res.json({status:422,type:'not_found'})
                }
            })
        }
    }
}

module.exports = updateProduct