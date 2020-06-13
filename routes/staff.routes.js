const express = require('express');
const router = express.Router();
const staff = require('./middleware/staff_middlewares')
const passport = require('../src/config/Passportconfig')


router.get('/', (req,res)=>res.send({staff_rights:req.user.rights,msg:'welcome to staff routes'}))

router.route('/verifytoken')
      .post(staff.verifyToken)

router.route('/register')
      .post(staff.validateStaffRegistration,staff.register,
            passport.authenticate('local-staff',{successRedirect:'/loginsuccess',failureRedirect:'/loginfail'}))

//update Reminder
router.route('/updatereminder')
       .post(staff.updateReminder)
            //search

// router.route('/search')
//       .post(staff.search)

router.route('/filteredsearch')
      .post(staff.filteredSearch)

//leads
router.route('/lead/createone')
      .post(staff.createLead)
      
router.route('/lead/createmultiple')
      .post(staff.createMultipleLeads)

router.route('/lead/readleads')
      .post(staff.readLeads)

router.route('/lead/changestatus')
      .post(staff.changeStatus)

//campaigns
router.route('/campaign/create')
      .post(staff.createCampaign)

router.route('/campaign/edit')
      .post(staff.editCampaign)

router.route('/campaign/delete')
      .post(staff.deleteCampaign)

router.route('/campaign/changestatus')
      .post(staff.changeCampaignStatus)

router.route('/campaign/readallcampaigns')
      .get(staff.readAllCampaigns)

//lead interactions
router.route('/leadinteraction/create')
      .post(staff.createLeadInteraction)

router.route('/leadinteraction/read')
      .post(staff.readLeadInteractions)





module.exports = router;
