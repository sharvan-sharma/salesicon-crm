const models = require('../../../src/config/models')

const findModel = type=>{
    switch(type){
        case 'admin-c': return models.Campaigns
        case 'admin-s': return models.Staff
        case 'admin-p': return models.Products
        default: console.log('type doesnot exist')
    }
}

const queryCondition = (type,regex)=>{
    switch(type){
        case 'admin-c': return {name:{$regex:regex}}
        case 'admin-p': return {name:{$regex:regex}}
        case 'admin-s': return {$or:[{'name.firstname':{$regex:regex}},{email:{$regex:regex}},{phone:{$regex:regex}},{location:{$regex:regex}}]}
        default: return {$or:[{'name.firstname':{$regex:regex}},{email:{$regex:regex}},{phone:{$regex:regex}},{location:{$regex:regex}}]}
    }
}



module.exports = (req,res,next) => {
    const {searchQuery,type,filters,sortby} = req.body
    if(!type){
        res.json({status:423,type:'type'})
    }else if(!req.user || req.user.account_type !== 'admin'){
        res.json({status:401,type:'Unauthorised'})
    }else{
        const regex = new RegExp(searchQuery,'i')
        if(type === 'admin-c'){
            models.Staff.find({admin_id:req.user._id},{_id:1},(err,staffObjectsArray)=>{
                if(err){res.json({status:500,type:'staffObjectsArray'})}
                else{
                    const staffarray = staffObjectsArray.map(obj=>obj._id)
                    const searchArray = (searchQuery === '')?[...(filters || []),{staff_id:{$in:staffarray}}]:[...(filters || []),{staff_id:{$in:staffarray}},queryCondition(type,regex)]
                    models.Campaigns.find({$and:searchArray})
                    .sort((sortby === undefined || Object.entries(sortby).length === 0)?{createdAt:1}:sortby)
                    .exec((err,campaignsArray)=>{
                        if(err){res.json({status:500,type:'campaigns error'})}
                        else{res.json({status:200,campaignsArray})}
                    })
                }
            })
        }else{
            
            const SearchModel = findModel(type)
            const searchArray = (searchQuery === '')?[...(filters || []),{admin_id:req.user._id}]:[...(filters || []),{admin_id:req.user._id},queryCondition(type,regex)]
            SearchModel.find({$and:searchArray})
            .sort((sortby === undefined || Object.entries(sortby).length === 0)?{createdAt:1}:sortby)
            .exec((err,array)=>{
                if(err){
                    res.json({status:500})}
                else{
                    switch(type){
                        case 'admin-p': res.json({status:200,productsArray:array});break;
                        case 'admin-s':  res.json({status:200,staffArray:array});break;
                        default:  console.log(`type doesn't exist`)
                    }
                }
            })
            }
        
    }
}