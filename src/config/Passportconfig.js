const passport = require('passport')
const models = require('./models')
const Staff = models.Staff
const Admin = models.Admin
const findStaff = require('./helpers').findStaff
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user,done)=>{
    // console.log('serialize',user.email)
    done(null,{_id:user._id,account_type:user.account_type})
})

passport.deserializeUser((session_data,done)=>{
    if(session_data.account_type === 'admin'){
        Admin.findById(session_data._id,(err,user)=>{
            if(err){done(err,null)}
            else{
                // console.log('admin deserialize',user.email)
                done(null,user)
            }
        })
    }else{
        const promise = findStaff(session_data._id)
        promise.then(userobj=>{
            done(null,userobj)
        })
    }
})

let staffStrategy = Staff.createStrategy()
staffStrategy.name = 'local-staff'

let adminStrategy = Admin.createStrategy()
adminStrategy.name = 'local-admin'

passport.use(staffStrategy)
passport.use(adminStrategy)

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.SERVER_DOMAIN+'/admin/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    Admin.findOne({email:profile._json.email},(err,admin)=>{
        if(err)throw err
        else if(admin){
            if(admin.approved === true){
                done(undefined,admin)
            }else{
                done(err,undefined)
            }
        }
        else{
            Admin.create({
                name:{
                    firstname:profile._json.given_name,
                    middlename:'',
                    lastname:profile._json.family_name
                },
                email:profile._json.email,
                phone:000000000,
                photo:profile._json.picture,
                verified:true,
                approved:false
                },(err,newAdmin)=>{
                    done(err,undefined)
                })
            }
    })
  }
));

module.exports = passport