const express = require('express');
const router = express.Router();
const common = require('./middleware/common_middlewares')
const passport = require('../src/config/Passportconfig')

router.get('/', (req,res)=>res.send('welcome to common routes'));

router.route('/checkemail')
      .post(common.checkEmail)

router.route('/checklogin')
      .get(common.checkLogin)

router.route('/changeprofilephoto')
      .post(common.changeProfilePhoto)

router.route('/editprofile')
      .post(common.editProfile)

router.route('/approve/admin')
      .post(common.sendAdminApprovalEmail)

router.route('/admin/auth/google')
      .get(passport.authenticate('google', { scope: ['profile','email'] }))

router.route('/admin/auth/google/callback')
      .get(passport.authenticate('google', { failureRedirect: '/login/oauth/fail', successRedirect:'/login/oauth/success' }))

router.route('/login')
      .post(common.validateLogin,common.passportAuthenticate)

router.route('/login/oauth/success')
      .get(common.oauthSuccess)

router.route('/login/oauth/fail')
      .get((req,res)=>res.status(302).redirect(process.env.FRONT_DOMAIN+'/oauth'))

router.route('/loginsuccess')
      .get(common.setLoginActive)

router.route('/loginfail')
      .get((req,res)=>res.json({status:401,logged_in:false,name:null,email:null}))

router.route('/forgotpassword')
      .post(common.passwordResetEmail)

router.route('/resetpassword')
      .post(common.verifyPasswordResetEmail)

router.route('/changepassword')
      .post(common.resetPassword,common.passportAuthenticate)


router.route('/readproducts')
      .get(common.readProducts)


router.route('/logout')
      .get(common.logout)

module.exports = router;