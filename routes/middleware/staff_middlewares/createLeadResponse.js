const LeadResponse = require('../../../src/config/models').LeadResponse


function createLeadResponse(req,res,next){
    if(!req.body.response_type || !['positive','negative'].includes(req.body.response_type)){
        res.json({status:423,type:'response_type'})
    }else if(!req.body.score || !Number.isInteger(req.body.score) || req.body.score > 10 || req.body.score < 0){
        console.log(!Number.isInteger(req.body.score))
        res.json({status:423,type:'score'})
    }else if(!req.user || req.user.account_type !== 'staff'){
        res.json({status:403,type:'unauthorised'})
    }else{
        const {response_type,score} = req.body
        LeadResponse.create({
            response_type,score,staff_id:req.user._id
        },(err,lead_response)=>{
            if(err){req.json({status:500})}
            else{res.json({status:200,lead_response_id:lead_response._id})}
        })
    }

}

module.exports = createLeadResponse
