const {Campaigns,Lead,Staff} = require('../../../src/config/models')



const campaignsReport = async (req,res,next)=>{
    try{
            const staffObjectArray = await Staff.find({admin_id:req.user._id})
            const staffArray = staffObjectArray.map(obj=>(obj._id).toString())
            const campaignsObjectArray = await Campaigns.find({staff_id:{$in:staffArray}},{name:1,status:1})
            const campaignsArray = campaignsObjectArray.map(obj=>(obj._id).toString())
            const resultArray = await Lead.aggregate([
                {$match:{campaign_id:{$in:campaignsArray},status:req.body.status}},
                {$project:{_id:0,status:1,campaign_id:1}},
                {$group:{_id:'$campaign_id',count:{$sum:1}}},
                {$sort:{count:-1}},
                {$limit:5}
            ])

            const resultReportArray = resultArray.map(ele=>{
                const campaign = campaignsObjectArray.find(cele=>cele._id == ele._id)
                return {...ele,...campaign._doc}
            })

            res.json({status:200,resultReportArray})

    }catch(e){
        res.json({status:500,e})
    }
}

module.exports = campaignsReport