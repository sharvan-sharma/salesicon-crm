const {isEmail} = require('../../../src/utils/validations')
const {sendEmail} = require('../../../src/utils/mail')
const {staffRegistrationEmailTemplate} = require('../../../src/utils/mail/templates')
const jwt = require('jsonwebtoken')
const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')

const generateReport = async (admin_id,emailsArray)=>{
    let [successCounter,validationErrorCounter,sendError,tokenError,totalCounter] = [0,0,0,0,emailsArray.length]
    await emailsArray.forEach((object,index)=>{
        if(isEmail(object.email)){
            jwt.sign({admin_id,email:object.email},process.env.STAFF_REGISTER_SECRET,(err,token)=>{
                if(err){tokenError += 1}
                else{ successCounter += 1
                    console.log(object.email)
                    // let promise = sendEmail(staffRegistrationEmailTemplate(email,token))
                    // promise.then(()=>successCounter += 1)
                    // .catch((err)=>sendError += 1)
                    }
            })
        }else{validationErrorCounter += 1}
    })

    return  {
                totalCounter,
                successCounter,
                failure:{
                    validationErrorCounter,
                    sendError,
                    tokenError
                }
            }
}


module.exports  = async (req,res,next)=>{
    
    if(!req.user || req.user.account_type !== 'admin'){
            res.json({status:403,type:'unauthorised'})
    }else{

        const busboy = new Busboy({headers:req.headers,limits:{files:1,fileSize:512000}})

        busboy.on('file',(fieldname, file, filename, encoding, mimetype)=>{

            const ext = filename.split('.').pop()
            const typeArray = ['xlsx','xls']
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

                    const converter = (ext === 'xls')?require('xls-to-json'):require('xlsx-to-json')

                    converter({
                                input: fullPath, 
                                output:null // input xls
                            }, function(err,emailsArray) {
                            if(err){res.json({status:500,type:1})}
                            else{
                                res.json({status:200,type:'mail scheduled'})
                                
                                let promise = generateReport(req.user._id,emailsArray)
                                promise.then(reportsObject=>{
                                    //code for reporting
                                    console.log(reportsObject)
                                }) 
                            }
                    })
                })
             }
        })
    
        req.pipe(busboy)
    }
}