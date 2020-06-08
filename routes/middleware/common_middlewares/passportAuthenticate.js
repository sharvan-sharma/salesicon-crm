const passport = require('../../../src/config/Passportconfig')


module.exports = (req,res,next)=>{
    if(req.body.type === 'staff'){
        passport.authenticate('local-staff')(req,res,()=>{
            if(req.isAuthenticated()){
                res.redirect('/loginsuccess')
            }else{
                 res.redirect('/loginfail')
            }
        })
    }else{
        passport.authenticate('local-admin')(req,res,()=>{
            if(req.isAuthenticated()){
                res.redirect('/loginsuccess')
            }else{
                 res.redirect('/loginfail')
            }
        })
    }
}