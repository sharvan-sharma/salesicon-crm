const Products = require('../../../src/config/models').Products


function deleteProduct(req,res,next){
    if(!req.body.product_id){
        res.json({status:423,type:'product_id'})
    }else{
        if(req.user.account_type === 'admin'){
            Products.findOneAndDelete({
                _id:req.body.product_id
            },(err,product)=>{
                if(err){
                    res.json({status:500})
                }else{
                    res.json({status:200,deleted_product_id:product._id})
                }
            })
        }else{
            res.json({status:403,type:'unauthorized'})
        }
    }
}

module.exports = deleteProduct