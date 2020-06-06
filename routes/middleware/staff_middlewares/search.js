const models = require('../../../src/config/models')

const findModel = type=>{
    switch(type){
        case 'campaigns': return models.Campaigns
        case 'leads': return models.Lead
        default: return models.Lead
    }
}
const queryCondition = (type,regex)=>{
    switch(type){
        case 'campaigns': return {name:{$regex:regex}}
        case 'leads': return {$or:[{name:{$regex:regex}},{email:{$regex:regex}},{phone:{$regex:regex}},{location:{$regex:regex}}]}
        default: return {$or:[{name:{$regex:regex}},{email:{$regex:regex}},{phone:{$regex:regex}},{location:{$regex:regex}}]}
    }
}


module.exports = (req,res,next) => {
    const {searchQuery,type} = req.body
    if(!type){
        res.json({status:423,type:'type'})
    }else if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:401,type:'Unauthorised'})
    }else{
        const SearchModel = findModel(type)
        const regex = new RegExp(searchQuery,'i')
        const searchArray = (searchQuery === '')?[{staff_id:req.user._id}]:[{staff_id:req.user._id},queryCondition(type,regex)]
        SearchModel.find({$and:searchArray},(err,array)=>{
            if(err){res.json({status:500})}
            else{
                switch(type){
                    case 'campaigns': res.json({status:200,campaignsArray:array});break;
                    case 'leads':  res.json({status:200,leadsArray:array});break;
                    default:  res.json({status:200,leadsArray:array})
                }
            }
        })
    }
}