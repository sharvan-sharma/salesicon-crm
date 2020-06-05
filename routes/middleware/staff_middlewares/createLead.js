const Lead  = require('../../../src/config/models').Lead
const validations = require('../../../src/utils/validations')
const sendEmail = require('../../../src/utils/mail').sendEmail
const leadRegistrationTemplate = require('../../../src/utils/mail/templates').leadRegistrationTemplate


const validateRequest = (req)=>{
    let promise = new Promise((resolve,reject)=>{
        const {lead_name,email,phone,interested_in,dob,location} = req.body
        const campaign_id = (req.body.campaign_id)?req.body.campaign_id:req.query.campaign_id
        if(!lead_name || !validations.checkName(lead_name)){
            resolve({status:423,type:'lead_name'})
        }else if(!email || !validations.isEmail(email)){
            resolve({status:423,type:'email'})
        }else if(!phone || !validations.isPhone(phone)){
            resolve({status:423,type:'phone'})
        }else if(!interested_in || !Array.isArray(interested_in) || interested_in.length === 0){
            resolve({status:423,type:'interested_in'})
        }else if((new Date(dob)).getTime() > (new Date()).getTime()){
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
            const campaign_id = (req.body.campaign_id)?req.body.campaign_id:req.query.campaign_id
            Lead.create({
                name:lead_name,
                email,
                phone,
                interested_in,
                dob,
                location,
                campaign_id,
                staff_id:req.user._id,
                source:'online',
                status:'A'
            },(err,lead)=>{
                if(err){res.json({status:500,type:'db'})}
                else {
                    const options = {
                        lead_name,
                        staff_name:req.user.name,
                        lead_email:email,
                        staff_email:req.user.email
                    }
                    const promise = sendEmail(leadRegistrationTemplate(options))
                    promise.then(result=>{res.json({status:200,lead_id:lead._id,msg:'mail sent'})})
                    .catch(err=>{res.json({status:500,type:'mail'})})
                }
            })
        }
    })
}



module.exports = createLead