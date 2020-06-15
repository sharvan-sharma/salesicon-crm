const Rights = require('../../../src/config/models').Rights
const winslogger = require('../../../src/logger')


function deleteRight(req,res,next){
    if(!req.body.right_id){
        res.json({status:423,type:'right_id'})
    }else{
        if(req.user.account_type === 'admin'){
            Rights.findOneAndDelete({
                _id:req.body.right_id
            },(err,right)=>{
                if(err){
                    res.json({status:500})
                    winslogger.error(`admin ${req.user.email} error while deleting right with id ${req.body.right_id}`)
                }else{
                    res.json({status:200,deleted_right_id:right._id})
                }
            })
        }else{
            res.json({status:403,type:'unauthorized'})
        }
    }
}

module.exports = deleteRight