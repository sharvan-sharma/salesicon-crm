const mongoose = require('mongoose')


const leadSchema =  mongoose.Schema({
    name:{type:Object,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    interested_in:[{type:String}],//list of product ids
    dob:{type:Date},
    source:{type:String,default:'online'},//online or offline (single entry from website 'online' and multiple entry from 'xls' offline)
    location:{type:String},
    status:{type:String,required:true,default:'Pending'},
    staff_id:{type:String,required:true},//who handle the lead
    campaign_id:{type:String,required:true},//campaign_id from which campaign we get the lead
    createdAt:{type:Date,default:Date.now},
    rem_date:{type:Date}
    //Add type of source to campaign
})

const Leads = mongoose.model('leads',leadSchema)

module.exports = Leads