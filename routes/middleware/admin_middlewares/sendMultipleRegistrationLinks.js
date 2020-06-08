const {isEmail} = require('../../../src/utils/validations')
const {sendEmail} = require('../../../src/utils/mail')
const {staffRegistrationEmailTemplate} = require('../../../src/utils/mail/templates')
const jwt = require('jsonwebtoken')
const busboy = require('busboy')


module.exports  = (req,res,next)=>{
    
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
                                const admin_id = req.user._id
                                let [successCounter,validationErrorCounter,sendError,tokenError,totalCounter] = [0,0,0,0,emailsArray.length]
                                emailsArray.forEach((email,index)=>{
                                    if(isEmail(email)){
                                        jwt.sign({admin_id,email},proccess.env.STAFF_REGISTER_SECRET,(err,token)=>{
                                            if(err){tokenError += 1}
                                            else{ successCounter += 1
                                                    // let promise = sendEmail(staffRegistrationEmailTemplate(email,token))
                                                    // promise.then(()=>successCounter += 1)
                                                    // .catch((err)=>sendError += 1)
                                            }
                                        })
                                    }else{
                                        validationErrorCounter += 1
                                    }
                                    if(index === (emailsArray.length - 1)){
                                        console.log({
                                            totalCounter,successCounter,
                                            failure:{
                                                validationErrorCounter,
                                                sendError,
                                                tokenError
                                            }
                                        })
                                    }
                                })
                                res.json({status:200,type:'mail scheduled'})
                            }
                    })
                })
             }
        })
    
        req.pipe(busboy)
    }
}