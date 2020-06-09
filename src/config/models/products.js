const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{type:String,required:true},//no two products are with same name
    description:{type:String,required:true},
    status:{type:String,required:true},//active or inactive
    createdAt:{type:Date,required:true,default:Date.now},
    admin_id:{type:String,required:true}
})

const Products =    mongoose.model('products',productSchema)

module.exports =    Products