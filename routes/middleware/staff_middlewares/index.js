const createLead = require('./createLead')
const createCampaign = require('./createCampaign')
const createLeadInteraction = require('./createLeadInteraction')
const createMultipleLeads = require('./createMultipleLeads')
const createLeadResponse = require('./createLeadResponse')
const passwordResetEmail =require('./passwordResetEmail')
const verifyPasswordResetEmail = require('./verifyPasswordResetEmail')
const resetPassword =require('./resetPassword')
const register = require('./register')
const validateStaffRegistration = require('./validateStaffRegistration')
const changeStaffProfilePhoto = require('./changeStaffProfilePhoto')
const checkEmail = require('./checkEmail')
const verifyEmail = require('./checkEmail')

module.exports = {
    checkEmail,
    verifyEmail,
    createLead,
    changeStaffProfilePhoto,
    createCampaign,
    createLeadInteraction,
    createMultipleLeads,
    createLeadResponse,
    passwordResetEmail,
    verifyPasswordResetEmail,
    resetPassword,
    register,
    validateStaffRegistration
}