const mongoose = require('mongoose')

const roleSchama = mongoose.Schema({
    admin_id:{type:String,required:true},
    name:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true}
})

const Roles =   mongoose.model('roles',roleSchama)

module.exports = Roles