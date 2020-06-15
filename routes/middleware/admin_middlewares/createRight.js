const Rights = require('../../../src/config/models').Rights
const winslogger = require('../../../src/logger')

function createRight(req,res,next){
    if(!req.body.right_name || req.body.right_name < 3 || req.body.right_name.includes(' ')){
        res.json({status:423,type:'right_name'})
    }else if(req.user.account_type !== 'admin'){
        res.json({status:423,type:'unauthorized'})
    }else{
        Rights.create({
            name:req.body.right_name,
            status:'A',
            description:req.body.description || '',
            screens:req.body.screens || []
        },(err,right)=>{
            if(err){
                res.json({status:500})
                 winslogger.error(`admin ${req.user.email} error while creating right with name ${req.body.right_name}`)
            }
            else{res.json({status:200,right_id:right._id})}            
        })
    }
}

module.exports = createRight