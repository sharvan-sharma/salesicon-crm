const Campaigns = require('../../../src/config/models').Campaigns

function createCampaign(req,res,next){

    if(!req.body.campaign_name || req.body.campaign_name.length < 3 || req.body.campaign_name.includes(' ')){
        res.json({status:423,type:'campaign'})
    }else if(req.user.account_type !== 'staff'){
        res.json({status:401,type:'unauthorized'})
    }else{
        Campaigns.create({
            name:req.body.campaign_name,
            description:req.body.description || '',
            status:'A',
            staff_id:req.user._id
        },(err,campaign)=>{
            if(err){res.json({status:500})}
            else{res.json({status:200,campaign_id:campaign._id})}
        })
    }
}

module.exports = createCampaign