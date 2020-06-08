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

router.route('/approve/admin')
      .post(common.sendAdminApprovalEmail)

router.route('/login')
      .post(common.validateLogin,common.passportAuthenticate)

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
      .get((req,res)=>{
            req.logout()
            res.json({status:200,logged_in:false,name:null,email:null})
      })

module.exports = router;