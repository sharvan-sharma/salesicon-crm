module.exports = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.json({  status:200,
                    logged_in:true,
                    name:req.user.name,
                    email:req.user.email,
                    phone:req.user.phone,
                    photo:req.user.photo,
                    createdAt:req.user.createdAt,
                    account_type:req.user.account_type})
    }else{
        res.json({
            status:401,
            logged_in:false,
            name:null,
            email:null,
            phone:null,
            photo:null,
            account_type:null,
            createdAt:null,
        })
    }
}