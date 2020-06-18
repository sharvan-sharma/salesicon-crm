const {isEmail} = require('../../../src/utils/validations')
const {sendEmail} = require('../../../src/utils/mail')
const {staffRegistrationEmailTemplate} = require('../../../src/utils/mail/templates')
const jwt = require('jsonwebtoken')
const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')
const maillogger = require('../../../src/logger/maillogger')
const winslogger = require('../../../src/logger')
const converter = require('xls-to-json')


const generateReport = async (admin_id,emailsArray)=>{

    await emailsArray.forEach((object)=>{
        if(isEmail(object.email)){
            jwt.sign({admin_id,email:object.email},process.env.STAFF_REGISTER_SECRET,(err,token)=>{
                if(err){
                    maillogger.error(`admin ${admin_id} error while generating token for staff registration link for email ${object.email}`)
                }else{ 
                    let promise = sendEmail(staffRegistrationEmailTemplate(object.email,token))
                    promise.then(()=>{
                        maillogger.info(`admin ${admin_id} succesfully sent mail containing staff registration link for email ${object.email}`)
                    })
                    .catch((err)=>{
                        maillogger.error(`admin ${admin_id} error while sending mail containing staff registration link for email ${object.email}`)
                    })
                    }
            })
        }else{
            maillogger.error(`admin ${admin_id} validation error email ${object.email}`)
        }
    })
}


module.exports  = async (req,res,next)=>{
    
    if(!req.user || req.user.account_type !== 'admin'){
            res.json({status:403,type:'unauthorised'})
    }else{

        const busboy = new Busboy({headers:req.headers,limits:{files:1,fileSize:512000}})

        busboy.on('file',(fieldname, file, filename, encoding, mimetype)=>{

            const ext = filename.split('.').pop()
            const typeArray = ['xls']
            const fullPath = path.join(process.cwd(),'/public/xls/admin',req.user._id+'.'+ext)
            
            if(!typeArray.includes(ext)){
                res.json({status:423,type:'file_type'})
            }else{
                
                let wstream = fs.createWriteStream(fullPath)
                file.pipe(wstream)

                file.on('limit',()=>{
                    fs.unlink(fullPath,()=>res.json({status:455,type:'exceeds'}))
                })

                file.on('end',()=>{
                    console.log('exec')
                    try{
                        converter({
                                    input: fullPath, 
                                    output:null // input xls
                                }, function(err,emailsArray) {
                                if(err){
                                    res.json({status:500,type:1})
                                    winslogger.error(`admin ${req.user.email} error while conversion from xls to json`)}
                                else{
                                    res.json({status:200,type:'mail scheduled'})
                                    generateReport(req.user._id,emailsArray)
                                
                                }
                        })
                    }catch(e){
                        console.log(e,fullPath)
                    }
                })
             }
        })
    
        req.pipe(busboy)
    }
}