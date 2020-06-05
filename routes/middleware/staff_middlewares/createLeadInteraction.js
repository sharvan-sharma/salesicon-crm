const {LeadInteractions,LeadResponse} = require('../../../src/config/models')

const validateRequest = (req)=>{
    let promise = new Promise((resolve,reject)=>{
        const {customer_id,datetime,score,response_type} = req.body
        if(!response_type || !['positive','negative'].includes(response_type)){
            res.json({status:423,type:'response_type'})
        }else if(!score || !Number.isInteger(score) || score > 10 || score < 0){
            res.json({status:423,type:'score'})
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
            const {remarks,datetime,response_type,score,customer_id} =  req.body
            LeadResponse.create({response_type,score},(err,lead_response)=>{
                if(err){res.json({status:500,type:'lead_response'})}
                else{
                    LeadInteractions.create({
                        remarks:remarks || '',
                        datetime:datetime || Date.now(),
                        response_id:lead_response._id,
                        customer_id,
                        staff_id:req.user._id
                    },(err,lead_interaction)=>{
                        if(err){res.json({status:500,type:'lead_interaction'})}
                        else{
                            res.json({status:200,
                                     lead_interaction:{
                                         _id:lead_interaction._id,
                                         datetime:lead_interaction.datetime,
                                         remarks:lead_interaction.remarks,
                                        response_id:{
                                            _id:lead_response._id,
                                            response_type:lead_response.response_type,
                                            score:lead_response.score
                                        }
                                     }
                                    })
                            }
                    })
                }
            })
        }
    })
}

module.exports = createLeadInteraction