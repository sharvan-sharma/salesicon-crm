const {Campaigns,Lead,Staff} = require('../../../src/config/models')
const winslogger = require('../../../src/logger')



const campaignsReport = async (req,res,next)=>{
    try{
            const staffObjectArray = await Staff.find({admin_id:req.user._id})
            const staffArray = staffObjectArray.map(obj=>(obj._id).toString())
            const campaignsObjectArray = await Campaigns.find({staff_id:{$in:staffArray}},{name:1,status:1,createdAt:1}).sort({createdAt:((req.query.type === 'top')?-1:1)})
            const campaignsArray = campaignsObjectArray.map(obj=>(obj._id).toString())
            const resultArray = await Lead.aggregate([
                {$match:{
                    campaign_id:{$in:campaignsArray},
                    status:'Converted',
                    statusChangedAt:{$lt:new Date(req.body.maxdate),$gte:new Date(req.body.mindate)}
                }},
                {$project:{_id:0,status:1,campaign_id:1}},
                {$group:{_id:'$campaign_id',count:{$sum:1}}},
                {$sort:{count:((req.query.type === 'top')?-1:1)}},
                {$limit:5}
            ])
            
            if(resultArray.length < 5){
                console.log(1)
                 if(campaignsObjectArray.length === resultArray.length){
                    const resultReportArray = resultArray.map(ele=>{
                        const campaign = campaignsObjectArray.find(cele=>cele._id == ele._id)
                        return {...ele,...campaign._doc}
                    })

                    res.json({status:200,campaignsArray:resultReportArray})
                 }else{
                        const resultReportArray = resultArray.map(ele=>{
                            const campaign = campaignsObjectArray.find(cele=>cele._id == ele._id)
                            return {...ele,...campaign._doc}
                        })

                     if(campaignsObjectArray.length < 5){
                        //adding remaining elements with count zero if staffObject array length  less than 5

                        for (let i = 0 ; i < (campaignsObjectArray.length-resultArray.length);i++){
                            resultReportArray.push({...campaignsObjectArray[i]._doc,count:0})
                        }


                        res.json({status:200,campaignsArray:resultReportArray})
                    }else{
                        
                        //adding remaining elements with count zero if staffObject array length  >= 5

                        for (let i = 0 ; i < (5-resultArray.length);i++){
                            resultReportArray.push({...campaignsObjectArray[i]._doc,count:0})
                        }

                        res.json({status:200,campaignsArray:resultReportArray})
                    }

                 }
            }else{
                const resultReportArray = resultArray.map(ele=>{
                    const campaign = campaignsObjectArray.find(cele=>cele._id == ele._id)
                    return {...ele,...campaign._doc}
                })

                res.json({status:200,campaignsArray:resultReportArray})
            }
    }catch(e){
        res.json({status:500,e})
        winslogger.error(`admin ${req.user.email} error while genrating campaigns reports by type ${req.query.type} from ${req.body.mindate} to ${req.body.maxdate}`)
    }
}

module.exports = campaignsReport