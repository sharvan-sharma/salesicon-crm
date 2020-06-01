module.exports = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.json({status:200,logged_in:true,name:req.user.name,email:req.user.email})
    }else{
        res.json({status:401,logged_in:false,name:null,email:null})
    }
}