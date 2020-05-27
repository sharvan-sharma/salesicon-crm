const Products = require('../../../src/config/models').Products

function createProduct(req,res,next){
    if(!req.body.product_name){
        res.json({status:423,type:'product name'})
    }else{
        if(req.user.account_type === 'admin'){
            Products.create({
                name:req.body.product_name,
                description:req.body.description || '',
                status:'A'
            },(err,product)=>{
                if(err){
                    res.json({status:500})
                }else{
                    res.json({status:200,product_id:product._id})
                }
            })
        }else{
            res.json({status:403,type:'unauthorized'})
        }
    }
}

module.exports = createProduct