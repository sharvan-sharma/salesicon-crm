const mongoose  = require('mongoose')

const leadResponseSchema = mongoose.Schema({
response_type:{type:String,required:true},
score:{type:Number,required:true}
})

const LeadResponse = mongoose.model('leadresponse',leadResponseSchema)

module.exports = LeadResponse