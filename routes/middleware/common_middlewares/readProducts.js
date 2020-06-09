const Products = require('../../../src/config/models').Products

module.exports = (req,res,next)=>{
    if(!req.user){
        res.json({status:401,type:'unauthorised'})
    }else{
        Products.find(
            {admin_id:(req.user.account_type === 'admin')?req.user._id:req.user.admin_id}
            ,(err,productsArray)=>{
            if(err){res.json({status:500})}
            else{res.json({status:200,productsArray})}
        })
    }
}