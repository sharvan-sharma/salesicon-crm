const express = require('express');
const router = express.Router();
const staff = require('./middleware/staff_middlewares')
const passport = require('../src/config/Passportconfig')


router.get('/', (req,res)=>res.send({staff_rights:req.user.rights,msg:'welcome to staff routes'}))

router.route('/checkemail')
      .post(staff.checkEmail)

router.route('/register')
      .post(staff.validateStaffRegistration,staff.register)

router.route('/verifyemail')
      .post(staff.verify)

router.route('/verifyapproval')
      .post(staff.verify)

router.route('/changestaffprofilephoto')
      .post(staff.changeStaffProfilePhoto)

router.route('/login')
      .post(staff.validateStaffLogin,
            passport.authenticate('local-staff',{successRedirect:'/staffapi/loginsuccess',failureRedirect:'/staffapi/loginfail'}))
    
router.route('/loginsuccess')
      .get(staff.setLoginActive)

router.route('/loginfail')
      .get((req,res)=>res.json({status:401,logged_in:false,name:null,email:null}))

router.route('/forgotpassword')
      .post(staff.passwordResetEmail)

router.route('/resetpassword')
      .post(staff.verifyPasswordResetEmail)

router.route('/changepassword')
      .post(staff.resetPassword,
            passport.authenticate('local-staff', {successRedirect: '/staffapi/loginsuccess',failureRedirect: '/staffapi/loginfail'}))

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

router.route('/lead/readallleads')
      .get(staff.readAllLeads)

router.route('/lead/closelead')
      .post(staff.closeLead)

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
