const mongoose = require('mongoose')

const staffRoleSchema = mongoose.Schema({
    staff_id:{type:String,required:true},
    role_id:{type:String,required:true}
})

const StaffRole = mongoose.model('staffroles',staffRoleSchema)

module.exports = StaffRole