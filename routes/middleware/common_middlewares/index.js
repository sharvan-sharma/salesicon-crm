const registerAdmin = require('./registerAdmin')
const generateAdminToken = require('./generateAdminToken')
const validateAdminRegistration = require('./validateAdminRegistration')
const changeAdminProfilePhoto = require('./changeAdminProfilePhoto')
const checkLogin = require('./checkLogin')
const approve = require('./approve')
const readProducts = require('./readProducts')

module.exports = {
    registerAdmin,
    generateAdminToken,
    validateAdminRegistration,
    changeAdminProfilePhoto,
    checkLogin,
    approve,
    readProducts
}