const Lead  = require('../../../src/config/models').Lead
const validations = require('../../../src/utils/validations')


const validateRequest = (req)=>{
    let promise = new Promise((resolve,reject)=>{
        const {lead_name,email,phone,interested_in,dob,location} = req.body
        const campaign_id = req.query.campaign_id
        if(!lead_name || !validations.checkName(lead_name)){
            resolve({status:423,type:'lead_name'})
        }else if(!email || !validations.isEmail(email)){
            resolve({status:423,type:'email'})
        }else if(!phone || !validations.isPhone(phone)){
            resolve({status:423,type:'phone'})
        }else if(!interested_in || typeof interested_in != Array || interested_in.length === 0){
            resolve({status:423,type:'interested_in'})
        }else if((new Date(dob)).getTime() <= (new Date()).getTime()){
            resolve({status:423,type:'dob'})
        }else if(!location){
            resolve({status:423,type:'location'})
        }else if(!campaign_id || campaign_id.length !== 24){
            resolve({status:423,type:'campaign_id'})
        }else if(!req.user || req.user.account_type !== 'staff'){
            resolve({status:423,type:'unauthorised'})
        }else{
            resolve({status:200})
        }
    })
    return promise
}


function createLead(req,res,next){
    validateRequest(req).then(result=>{
        if(result.status === 423){
            res.json(result)
        }else{
            const {lead_name,email,phone,interested_in,dob,location} = req.body
            const campaign_id = req.query.campaign_id
            Lead.create({
                name:lead_name,
                email,
                phone,
                interested_in,
                dob,
                location,
                campaign_id,
                staff_id:req.user._id,
                source:'online'
            },(err,lead)=>{
                if(err){res.json({status:500})}
                else {res.json({status:200,lead_id:lead._id})}
            })
        }
    })
}



module.exports = createLead