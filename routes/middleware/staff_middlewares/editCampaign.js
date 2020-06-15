const Campaigns = require('../../../src/config/models').Campaigns
const winslogger = require('../../../src/logger')

module.exports = (req,res,next)=>{

    if(!req.body.campaign_name || req.body.campaign_name.length < 3 || req.body.campaign_name.includes(' ')){
        res.json({status:423,type:'campaign_name'})
    }else if(!req.body.campaign_id || req.body.campaign_id.length !== 24){
        res.json({status:423,type:'campaign_id'})
    }else if(req.user.account_type !== 'staff'){
        res.json({status:401,type:'unauthorized'})
    }else{
        let {campaign_name,description,campaign_id} = req.body
        Campaigns.findOneAndUpdate({_id:campaign_id,staff_id:req.user._id},
                                    {
                                        '$set':{
                                            name:campaign_name,
                                            description
                                        }
                                    },
                                    {new:true,strict:false},
                                    (err,campaign)=>{
                                        if(err){
                                            res.json({status:500})
                                            winslogger.error(`staff ${req.user.email} error while editing campaign with id ${campaign_id}`)
                                        }
                                        else if(campaign){res.json({
                                            status:200,
                                            campaign:{
                                                name:campaign.name,
                                                description:campaign.description,
                                                _id:campaign._id,
                                                status:campaign.status,
                                                createdAt:campaign.createdAt,
                                            }
                                            })
                                            winslogger.error(`staff ${req.user.email}successfully edited campaign with id ${campaign_id}`)
                                        }else {
                                            res.json({status:422,type:'not found'})
                                        }
                                    })
    }
}