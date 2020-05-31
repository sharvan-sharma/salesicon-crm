
module.exports = (req,res,next)=>{
    const fullPath = req.baseUrl + req.path

    let result = req.user.screens.some((screen)=>
    {
        if(screen.uri === fullPath){
            return true
        }else{
            return false
        }
    })

    if(result === true){
        next()
    }else{
        res.json({status:403,type:'access_denied'})
    }
}