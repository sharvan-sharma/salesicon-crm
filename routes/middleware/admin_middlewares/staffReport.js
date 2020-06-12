const {Lead,Staff} = require('../../../src/config/models')


const staffReport = async (req,res,next)=>{
        try{
            const staffObjectArray = await Staff.find({admin_id:req.user._id},{name:1,photo:1,status:1})
            const staffArray = staffObjectArray.map(obj=>(obj._id).toString())
            const resultArray = await Lead.aggregate([
                {$match:{staff_id:{$in:staffArray},status:req.body.status}},
                {$project:{_id:0,status:1,staff_id:1}},
                {$group:{_id:'$staff_id',count:{$sum:1}}},
                {$sort:{count:-1}},
                {$limit:5}
            ])

            const staffReportArray = resultArray.map(ele=>{
                const staff = staffObjectArray.find(sele=>sele._id == ele._id)
                return {...ele,...staff._doc}
            })

            res.json({status:200,staffReportArray})
        }catch(e){
            res.json({status:500,e})
        }
}

module.exports = staffReport

