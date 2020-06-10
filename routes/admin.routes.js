const express = require('express');
const admin = require('./middleware/admin_middlewares')
const router = express.Router();


router.get('/',(req, res)=>res.send('welcome to admin routes'));

router.route('/register')
      .post(admin.validateAdminRegistration,admin.registerAdmin)

router.route('/verifyemail')
      .post(admin.verify)

router.route('/verifyapproval')
      .post(admin.verify)

router.route('/send/registerlink/single')
      .post(admin.sendSingleRegistrationLink)

router.route('/send/registerlink/multiple')
      .post(admin.sendMultipleRegistrationLinks)

router.route('/setstaffstatus')
      .post(admin.setStaffStatus)

//Products CRUD
router.route('/product/create')
      .post(admin.createProduct)

router.route('/product/update')
      .post(admin.updateProduct.validate,admin.updateProduct.updateNameAndDescription)

router.route('/product/update/status')
      .post(admin.updateProduct.validate,admin.updateProduct.updateStatus)

router.route('/product/delete')
      .post(admin.deleteProduct)

router.route('/staff/readall')
      .get(admin.readAllStaff)

router.route('/staff/changestatus')
      .post(admin.changeStaffStatus)

router.route('/conversions')
      .post(admin.conversionInfo)
//campaigns

router.route('/campaigns/readall')
      .get(admin.readAllCampaigns)

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