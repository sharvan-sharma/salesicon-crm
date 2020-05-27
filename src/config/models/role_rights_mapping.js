const mongoose = require('mongoose')

const roleRightSchama = mongoose.Schema({
    role_id:{type:String,required:true},
    right_id:[{type:String,required:true}]//a role has multiple rights
})

const RoleRight = mongoose.model('rolerights',roleRightSchama)

module.exports = RoleRight