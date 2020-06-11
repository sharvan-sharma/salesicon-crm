const models = require('../../../src/config/models')

const findModel = type=>{
    switch(type){
        case 'staff-c': return models.Campaigns
        case 'staff-l': return models.Lead
        default: return models.Lead
    }
}

const queryCondition = (type,regex)=>{
    switch(type){
        case 'staff-c': return {name:{$regex:regex}}
        case 'staff-l': return {$or:[{'name.firstname':{$regex:regex}},{email:{$regex:regex}},{phone:{$regex:regex}},{location:{$regex:regex}}]}
        default: return {$or:[{'name.firstname':{$regex:regex}},{email:{$regex:regex}},{phone:{$regex:regex}},{location:{$regex:regex}}]}
    }
}



module.exports = (req,res,next) => {
    const {searchQuery,type,filters,sortby} = req.body
    if(!type){
        res.json({status:423,type:'type'})
    }else if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:401,type:'Unauthorised'})
    }else{
        const SearchModel = findModel(type)
        const regex = new RegExp(searchQuery,'i')
        const searchArray = (searchQuery === '')?[...(filters || []),{staff_id:req.user._id}]:[...(filters || []),{staff_id:req.user._id},queryCondition(type,regex)]
        SearchModel.find({$and:searchArray})
        .sort((sortby === undefined || Object.entries(sortby).length === 0)?{createdAt:1}:sortby)
        .exec((err,array)=>{
            if(err){
                console.log(err)
                res.json({status:500})}
            else{
                switch(type){
                    case 'staff-c': res.json({status:200,campaignsArray:array});break;
                    case 'staff-l':  res.json({status:200,leadsArray:array});break;
                    default:  res.json({status:200,leadsArray:array})
                }
            }
        })
    }
}