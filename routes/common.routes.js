const express = require('express');
const router = express.Router();
const common = require('./middleware/common_middlewares')

router.get('/', (req,res)=>res.send('welcome to common routes'));

router.route('/generateadmintoken')
      .post(common.generateAdminToken)

router.route('/registeradmin')
      .post(common.validateAdminRegistration,common.registerAdmin)

router.route('/changeadminprofilephoto')
      .post(common.changeAdminProfilePhoto)

router.route('/checklogin')
      .get(common.checkLogin)

router.route('/approve')
      .post(common.approve)

router.route('/logout')
      .get((req,res)=>{
            req.logout()
            res.json({status:200})
      })

module.exports = router;