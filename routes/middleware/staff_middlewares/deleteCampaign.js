const Campaigns = require('../../../src/config/models').Campaigns

module.exports = (req,res,next)=>{

    if(!req.body.campaign_id || req.body.campaign_id.length !== 24){
        res.json({status:423,type:'campaign_id'})
    }else if(req.user.account_type !== 'staff'){
        res.json({status:401,type:'unauthorized'})
    }else{
        let {campaign_id} = req.body
        Campaigns.findOneAndDelete({_id:campaign_id,staff_id:req.user._id},
                                    (err,campaign)=>{
                                        if(err){res.json({status:500})}
                                        else if(campaign){res.json({
                                            status:200,
                                            deleted_campaign_id:campaign._id
                                            })
                                        }else {
                                            res.json({status:422,type:'not found'})
                                        }
                                    })
    }
}