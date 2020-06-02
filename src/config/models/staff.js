const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')


const staffSchema = mongoose.Schema({
    name:{type:Object,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    account_type:{type:String,required:true,default:'staff'},
    photo:{type:String,default:null},
    attempts:{type:Number},
    last:{type:String},
    verified:{type:Boolean,required:true},
    approved:{type:Boolean,required:true},
    login_status:{type:String},
    status:{type:String},
    createdAt:{type:Date,default:Date.now}
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

staffSchema.plugin(passportLocalMongoose,options)

const Staff = mongoose.model('staffs',staffSchema)

module.exports =    Staff