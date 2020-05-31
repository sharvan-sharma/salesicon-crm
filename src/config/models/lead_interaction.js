const mongoose = require('mongoose')

const leadInteractionSchema = mongoose.Schema({
datetime:{type:Date,required:true,default:Date.now},
remarks:{type:String,required:true},
response_id:{type:String,required:true},//id of the lead response
customer_id:{type:String,required:true},//lead_id
staff_id:{type:String,required:true}//id of staff who handled the lead
})

const LeadInteractions = mongoose.model('leadinteractions',leadInteractionSchema)

module.exports = LeadInteractions