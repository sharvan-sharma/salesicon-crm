const express = require('express');
const router = express.Router();
const staff = require('./middleware/staff_middlewares')
const passport = require('../src/config/Passportconfig')


router.get('/', (req,res)=>res.send('welcome to staff routes'))

router.route('/login')
      .post(passport.authenticate('local-staff',{successRedirect:'/staffapi/loginsuccess',failureRedirect:'/staffapi/loginfail'}))
    
router.route('/loginsuccess')
      .get((req,res)=>res.json({status:200,logged_in:true,user_type:req.user.account_type}))

router.route('/loginfail')
      .get((req,res)=>res.json({status:401,logged_in:false,user_type:null}))


router.route('/lead/createone')
      .post(staff.createLead)

//rem route
router.route('/lead/createmultiple')
      .post(staff.createMultipleLeads)

router.route('/leadinteraction/create')
      .post(staff.createLeadInteraction)

router.route('/campaign/create')
      .post(staff.createCampaign)

router.route('/leadresponse/create')
      .post(staff.createLeadResponse)



module.exports = router;
