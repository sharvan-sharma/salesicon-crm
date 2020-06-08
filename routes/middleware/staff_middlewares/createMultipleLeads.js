const Lead = require('../../../src/config/models').Lead
const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')
const validations = require('../../../src/utils/validations')
const {sendEmail} = require('../../../src/utils/mail')
const {leadRegistrationTemplate} = require('../../../src/utils/mail/templates')

function validateObj(obj){
    let promise = new Promise((resolve,reject)=>{
        const {firstname,middlename,lastname,email,phone,interested_in,dob,location,campaign_id} = obj
        let productArray = interested_in.split(',')
        if(!firstname || !validations.checkName({firstname,middlename,lastname})){
            resolve(false)
        }else if(!email || !validations.isEmail(email)){
            resolve(false)
        }else if(!phone || !validations.isPhone(phone)){
            resolve(false)
        }else if(productArray.length  === 0){
            resolve(false)
        }else if(!dob || (new Date(dob)).getTime() >= (new Date()).getTime()){
            resolve(false)
        }else if(!location){
            resolve(false)
        }else if(!campaign_id || campaign_id.length !== 24){
            resolve(false)
        }else{
            resolve(true)
        }
    })
    return promise
}

async function filterFunction(result,staff_id){
        let validResultArray = [] 
        await result.forEach(async (obj)=>{
                                    let valid = await validateObj(obj)
                                    if(valid === true){
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
                                    }
                                })
        return validResultArray
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
                let wstream = fs.createWriteStream(fullPath)
                file.pipe(wstream)

                file.on('limit',()=>{
                    fs.unlink(fullPath,()=>res.json({status:455,type:'exceeds'}))
                })

                file.on('end',()=>{
                    const converter = (ext === 'xls')?require('xls-to-json'):require('xlsx-to-json')
                    converter({
                                input: fullPath, 
                                output:null // input xls
                            }, function(err, result) {
                            if(err){res.json({status:500,type:1})}
                            else{
                                let promise = filterFunction(result,req.user._id)
                                promise.then(validResultArray=>{
                                    Lead.create(validResultArray,(err,resultarray)=>{
                                            if(err){
                                                console.log(err)
                                                res.json({status:500,type:2})}
                                            else if(resultarray){
                                                fs.unlink(fullPath,()=>res.json({status:200,msg:'mails scheduled'}))
                                                resultarray.forEach((lead)=>{
                                                    console.log(`mail sent ${lead.email}`)
                                                })
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