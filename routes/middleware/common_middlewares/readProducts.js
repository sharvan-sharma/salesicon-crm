const Products = require('../../../src/config/models').Products

module.exports = (req,res,next)=>{
    Products.find({},(err,productsArray)=>{
        if(err){res.json({status:500})}
        else{res.json({status:200,productsArray})}
    })
}