const {Lead,Staff} = require('../../../src/config/models')
const winslogger = require('../../../src/logger')


const staffReport = async (req,res,next)=>{
        try{
            const staffObjectArray = await Staff.find({admin_id:req.user._id},{createdAt:1,name:1,photo:1,status:1,email:1,phone:1})
            const staffArray = staffObjectArray.map(obj=>(obj._id).toString())
            const resultArray = await Lead.aggregate([
                {$match:{
                    staff_id:{$in:staffArray},
                    status:'Converted',
                    statusChangedAt:{$lt:new Date(req.body.maxdate),$gte:new Date(req.body.mindate)}
                }},
                {$project:{_id:0,status:1,staff_id:1}},
                {$group:{_id:'$staff_id',count:{$sum:1}}},
                {$sort:{count:((req.query.type === 'top')?-1:1)}},
                {$limit:5}
            ])

            const staffReportArray = resultArray.map(ele=>{
                const staff = staffObjectArray.find(sele=>sele._id == ele._id)
                return {...ele,...staff._doc}
            })

            res.json({status:200,staffArray:staffReportArray})
        }catch(e){
            res.json({status:500,e})
            winslogger.error(`admin ${req.user.email} error while generating staff report of type ${req.query.type} from ${req.body.mindate} to ${req.body.maxdate}`)
        }
}

module.exports = staffReport

