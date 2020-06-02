const express = require('express');
const admin = require('./middleware/admin_middlewares')
const router = express.Router();
const passport = require('../src/config/Passportconfig')


router.get('/',(req, res)=>res.send('welcome to admin routes'));

router.route('/login')
      .post(passport.authenticate('local-admin',{successRedirect:'/adminapi/loginsuccess',failureRedirect:'/adminapi/loginfail'}))
    
router.route('/loginsuccess')
      .get((req,res)=>res.json({status:200,logged_in:true,user_type:req.user.account_type}))

router.route('/loginfail')
      .get((req,res)=>res.json({status:401,logged_in:false,user_type:null}))

router.route('/sendstaffapproval')
      .post(admin.sendStaffApprovalEmail)

router.route('/setstaffstatus')
      .post(admin.setStaffStatus)

//Products CRUD
router.route('/product/create')
      .post(admin.createProduct)

router.route('/product/update/name')
      .post(admin.updateProduct.validate,admin.updateProduct.name)

router.route('/product/update/description')
      .post(admin.updateProduct.validate,admin.updateProduct.description)

router.route('/product/update/status')
      .post(admin.updateProduct.validate,admin.updateProduct.status)

router.route('/product/delete')
      .post(admin.deleteProduct)

//Roles CRUD
router.route('/role/create')
      .post(admin.createRole)

router.route('/role/update/name')
      .post(admin.updateRole.validate,admin.updateRole.name)

router.route('/role/update/description')
      .post(admin.updateRole.validate,admin.updateRole.description)

router.route('/role/update/status')
      .post(admin.updateRole.validate,admin.updateRole.status)

router.route('/role/delete')
      .post(admin.deleteRole)

//Rights CRUD
router.route('/right/create')
      .post(admin.createRight)

router.route('/right/update/name')
      .post(admin.updateRight.validate,admin.updateRight.name)

router.route('/right/update/description')
      .post(admin.updateRight.validate,admin.updateRight.description)

router.route('/right/update/status')
      .post(admin.updateRight.validate,admin.updateRight.status)
//Rights screens Array Push and Pull
router.route('/right/update/screens/add')
      .post(admin.updateRight.validate,admin.updateRight.screens.add)

router.route('/right/update/screens/removeone')
      .post(admin.updateRight.validate,admin.updateRight.screens.removeOne)

router.route('/right/update/screens/removemultiple')
      .post(admin.updateRight.validate,admin.updateRight.screens.removeMultiple)

router.route('/right/update/screens/removeall')
      .post(admin.updateRight.validate,admin.updateRight.screens.removeAll)

router.route('/right/delete')
      .post(admin.deleteRight)




module.exports = router;