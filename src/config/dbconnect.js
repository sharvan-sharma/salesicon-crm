const mongoose = require('mongoose')

const url = (process.env.DBENV === 'offline')?process.env.MONGOURL:process.env.MONGOATLASURL

mongoose.connect(url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})

module.exports = mongoose.connection