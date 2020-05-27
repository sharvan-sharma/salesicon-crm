const mongoose = require('mongoose')

const staffRoleSchema = mongoose.Schema({
    staff_id:{type:mongoose.Schema.Types.ObjectId,ref:'staffs',required:true},
    role_id:{type:mongoose.Schema.Types.ObjectId,ref:'roles',required:true}
})

const StaffRole = mongoose.model('staffroles',staffRoleSchema)

module.exports = StaffRole