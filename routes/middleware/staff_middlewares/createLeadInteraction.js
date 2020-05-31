const LeadInteractions = require('../../../src/config/models').LeadInteractions

const validateRequest = (req)=>{
    let promise = new Promise((resolve,reject)=>{
        const {response_id,customer_id,datetime} = req.body
        if(!response_id || response_id.length != 24){
            resolve({status:423,type:'response_id'})
        }else if(!customer_id || customer_id.length != 24){
            resolve({status:423,type:'customer_id'})
        }else if(datetime && (new Date(datetime) === "Invalid Date" || isNaN(new Date(datetime)))){
            resolve({status:423,type:'datetime'})
        }else if(!req.user || req.user.account_type !== 'staff'){
            resolve({status:401,type:'unauthorised'})
        }else{
            resolve({status:200})
        }
    })
    return promise
}

function createLeadInteraction(req,res,next){
    validateRequest(req).then(result=>{
        if(result.status === 423 || result.status === 401){
            res.json(result)
        }else{
            const {remarks,datetime,response_id,customer_id} =  req.body
            LeadInteractions.create({
                remarks:remarks || '',
                datetime:datetime || Date.now(),
                response_id,
                customer_id,
                staff_id:req.user._id
            },(err,lead_interaction)=>{
                if(err){res.json({status:500})}
                else{res.json({status:200,lead_interaction_id:lead_interaction._id})}
            })
        }
    })
}

module.exports = createLeadInteraction