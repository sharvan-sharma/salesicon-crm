const registerAdmin = require('../admin_middlewares/registerAdmin')
const validateAdminRegistration = require('../admin_middlewares/validateAdminRegistration')
const checkLogin = require('./checkLogin')
const readProducts = require('./readProducts')
const checkEmail =  require('./checkEmail')
const changeProfilePhoto = require('./changeProfilePhoto')
const setLoginActive = require('./setLoginActive')
const passwordResetEmail = require('./passwordResetEmail')
const resetPassword = require('./resetPassword')
const verifyPasswordResetEmail = require('./verifyPasswordResetEmail')
const validateLogin = require('./validateLogin')
const passportAuthenticate = require('./passportAuthenticate')
const sendAdminApprovalEmail = require('./sendAdminApprovalEmail')
const oauthSuccess = require('./oauthSuccess')
const logout = require('./logout')
const editProfile = require('./editProfile')
const changeProfilePhotoAwsS3 = require('./changeProfilePhotoAwsS3')

module.exports = {
    changeProfilePhotoAwsS3,
    logout,
    editProfile,
    oauthSuccess,
    passportAuthenticate,
    sendAdminApprovalEmail,
    registerAdmin,
    validateLogin,
    resetPassword,
    verifyPasswordResetEmail,
    passwordResetEmail,
    validateAdminRegistration,
    setLoginActive,
    checkLogin,
    readProducts,
    checkEmail,
    changeProfilePhoto
}