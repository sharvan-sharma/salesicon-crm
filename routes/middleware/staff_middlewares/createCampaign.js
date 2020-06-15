const Campaigns = require('../../../src/config/models').Campaigns
const winslogger =  require('../../../src/logger')

function createCampaign(req,res,next){

    if(!req.body.campaign_name || req.body.campaign_name.length < 3 || req.body.campaign_name.includes(' ')){
        res.json({status:423,type:'campaign_name'})
    }else if(req.user.account_type !== 'staff'){
        res.json({status:401,type:'unauthorized'})
    }else{
        Campaigns.create({
            name:req.body.campaign_name,
            description:req.body.description || '',
            status:'A',
            staff_id:req.user._id
        },(err,campaign)=>{
            if(err){
                res.json({status:500})
                winslogger.error(`staff ${req.user.email} error while creating campaign`)
            }
            else{res.json({
                status:200,
                campaign:{
                    name:campaign.name,
                    description:campaign.description,
                    _id:campaign._id,
                    status:campaign.status,
                    createdAt:campaign.createdAt,
                   }
                })
                winslogger.info(`staff ${req.user.email} created a cmapign ${campaign.name}`)
            }
        })
    }
}

module.exports = createCampaign