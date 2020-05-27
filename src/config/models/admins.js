const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')


const adminSchema = mongoose.Schema({
    name:{type:Object,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    account_type:{type:String,required:true,default:'admin'},
    photo:{type:String,default:null},
    attempts:{type:Number},
    last:{type:String},
    verified:{type:Boolean,required:true},
    status:{type:String},
    createdAt:{type:Date,default:Date.now},
})

const options = {
    maxInterval:60000,
    usernameField:'email',
    attemptsField:'attempts',
    lastLoginField:'last',
    usernameLowerCase:false,
    limitAttempts:true,
    maxAttempts:10,
    usernameQueryFields:['email']
}

adminSchema.plugin(passportLocalMongoose,options)

const Admin = mongoose.model('admins',adminSchema)

module.exports =  Admin