const Lead = require('../../../src/config/models').Lead
const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')
const validations = require('../../../src/utils/validations')
const {sendEmail} = require('../../../src/utils/mail')
const {leadRegistrationTemplate} = require('../../../src/utils/mail/templates')
const mailslogger = require('../../../src/logger/maillogger')
const winslogger = require('../../../src/logger')
const maillogger = require('../../../src/logger/maillogger')

function validateObj(obj){
    let promise = new Promise((resolve,reject)=>{
        const {firstname,middlename,lastname,email,phone,interested_in,dob,location,campaign_id} = obj
        let productArray = interested_in.split(',')
        if(!firstname || !validations.checkName({firstname,middlename,lastname})){
            resolve({valid:false,error:'name'})
        }else if(!email || !validations.isEmail(email)){
            resolve({valid:false,error:'email'})
        }else if(!phone || !validations.isPhone(phone)){
            resolve({valid:false,error:'phone'})
        }else if(productArray.length  === 0){
            resolve({valid:false,error:'interested_in'})
        }else if(!dob || (new Date(dob)).getTime() >= (new Date()).getTime()){
            resolve({valid:false,error:'dob'})
        }else if(!location){
            resolve({valid:false,error:'location'})
        }else if(!campaign_id || campaign_id.length !== 24){
            resolve({valid:false,error:'campaign_id'})
        }else{
            resolve({valid:true})
        }
    })
    return promise
}

async function filterFunction(result,staff_id){
        let validResultArray = [] 
        await result.forEach(async (obj,index)=>{
                                    let result = await validateObj(obj)
                                    if(result.valid === true){
                                        let leadObject = {}
                                        leadObject['name'] = {
                                            'firstname':obj.firstname,
                                            'middlename':obj.middlename,
                                            'lastname':obj.lastname
                                        }
                                        leadObject['staff_id'] = staff_id
                                        leadObject['interested_in'] = obj.interested_in.split(',')
                                        leadObject['email'] = obj.email
                                        leadObject['phone'] = obj.phone
                                        leadObject['dob'] = obj.dob
                                        leadObject['location'] = obj.location
                                        leadObject['source'] = 'offline'
                                        leadObject['campaign_id'] = obj.campaign_id
                                        validResultArray.push(leadObject)
                                    }else{
                                        maillogger.error(`staff ${staff_id} validation error for lead with email ${obj.email}`)
                                    }
                        })
        return validResultArray
}

function generateReport (staff_name,staff_email,resultArray){
    resultArray.forEach((lead)=>{
            const options = {
                                lead_name:lead.name,
                                staff_name,
                                lead_email:lead.email,
                                staff_email
                            }
            let promise = sendEmail(leadRegistrationTemplate(options))
            promise.then(()=>{
                 maillogger.info(`staff ${staff_email} successfully sent mail to lead ${lead.email} `)
            }).catch(err=>{
                maillogger.error(`staff ${staff_email} error while sending mail to lead ${lead.email} `)
            })
    })
}

function createMultipleLeads(req,res,next){
    
    if(!req.user || req.user.account_type !== 'staff'){
            res.json({status:403,type:'unauthorised'})
    }else{
        const busboy = new Busboy({headers:req.headers,limits:{files:1,fileSize:512000}})

        busboy.on('file',(fieldname, file, filename, encoding, mimetype)=>{
            const ext = filename.split('.').pop()
            const typeArray = ['xlsx','xls']
            const fullPath = path.join(process.cwd(),'/public/xls/staff',req.user._id+'.'+ext)
            if(!typeArray.includes(ext)){
                res.json({status:423,type:'file_type'})
            }else{

                console.log(1,fullPath)

                let wstream = fs.createWriteStream(fullPath)
                file.pipe(wstream)

                file.on('limit',()=>{
                    fs.unlink(fullPath,()=>res.json({status:455,type:'exceeds'}))
                })

                file.on('end',()=>{
                    console.log(2,fullPath)
                    const converter = (ext === 'xls')?require('xls-to-json'):require('xlsx-to-json')
                    converter({
                                input: fullPath, 
                                output:null // input xls
                            }, function(err, result) {
                                console.log(err,fullPath)
                            if(err){
                                
                                res.json({status:500,type:1})
                                winslogger.error(`staff ${req.user.email} error while converting xls to json`)
                            }
                            else{
                                fs.unlink(fullPath,()=>res.json({status:200,msg:'mails scheduled'}))

                                let promise = filterFunction(result,req.user._id)
                                promise.then(validResultArray=>{
                                    Lead.create(validResultArray,(err,resultArray)=>{
                                            if(err){
                                                winslogger.error(`staff ${req.user.email} error while creating leads`)
                                            }else if(resultArray){
                                                 generateReport(req.user.name,req.user.email,resultArray)
                                            }
                                    })
                                })
                            }
                    })
                })
             }
        })
    
        req.pipe(busboy)
    }
}

module.exports = createMultipleLeads