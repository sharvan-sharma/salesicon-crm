const mongoose = require('mongoose')

const screenUriSchema = mongoose.model({
    uri:{type:String,required:true}
})

const rightSchama = mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true},
    screens:[screenUriSchema]
})

const Rights =   mongoose.model('rights',rightSchama)

module.exports = Rights
