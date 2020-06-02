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
