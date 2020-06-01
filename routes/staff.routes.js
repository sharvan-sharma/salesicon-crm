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
      .post(staff.verifyEmail)

router.route('/changestaffprofilephoto')
      .post(staff.changeStaffProfilePhoto)

router.route('/login')
      .post(passport.authenticate('local-staff',{successRedirect:'/staffapi/loginsuccess',failureRedirect:'/staffapi/loginfail'}))
    
router.route('/loginsuccess')
      .get((req,res)=>res.json({status:200,logged_in:true,user_type:req.user.account_type}))

router.route('/loginfail')
      .get((req,res)=>res.json({status:401,logged_in:false,user_type:null}))

router.route('/forgotpwd')
    .post(staff.passwordResetEmail)

router.route('/resetpassword')
    .post(staff.verifyPasswordResetEmail)

router.route('/changepassword')
    .post(staff.resetPassword,
        passport.authenticate('local-staff', {
            successRedirect: '/loginsuccess',
            failureRedirect: '/loginfail'
        }))


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
