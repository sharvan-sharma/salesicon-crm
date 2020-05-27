const mongoose = require('mongoose')

const roleRightSchama = mongoose.Schema({
    role_id:{type:mongoose.Schema.Types.ObjectId,ref:'roles',required:true},
    right_id:[{type:mongoose.Schema.Types.ObjectId,ref:'rights',required:true}]//a role has multiple rights
})

const RoleRight = mongoose.model('rolerights',roleRightSchama)

module.exports = RoleRight