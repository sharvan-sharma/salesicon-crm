const createLead = require('./createLead')
const createCampaign = require('./createCampaign')
const createLeadInteraction = require('./createLeadInteraction')
const createMultipleLeads = require('./createMultipleLeads')
const passwordResetEmail =require('./passwordResetEmail')
const verifyPasswordResetEmail = require('./verifyPasswordResetEmail')
const resetPassword =require('./resetPassword')
const register = require('./register')
const validateStaffRegistration = require('./validateStaffRegistration')
const changeStaffProfilePhoto = require('./changeStaffProfilePhoto')
const checkEmail = require('./checkEmail')
const verify = require('./verify')
const validateStaffLogin = require('./validateStaffLogin')
const setLoginActive = require('./setLoginActive')
const readAllCampaigns = require('./readAllCampaigns')
const editCampaign = require('./editCampaign')
const changeCampaignStatus = require('./changeCampaignStatus')
const deleteCampaign = require('./deleteCampaign')
const readAllLeads = require('./readAllLeads')
const readLeadInteractions = require('./readLeadInteractions')
const closeLead = require('./closeLead')
const search = require('./search')
const filteredSearch = require('./filteredSearch')
const updateReminder = require('./updateReminder')

module.exports = {
    updateReminder,
    readLeadInteractions,
    readAllLeads,
    deleteCampaign,
    changeCampaignStatus,
    editCampaign,
    readAllCampaigns,
    setLoginActive,
    validateStaffLogin,
    checkEmail,
    verify,
    createLead,
    changeStaffProfilePhoto,
    createCampaign,
    createLeadInteraction,
    createMultipleLeads,
    passwordResetEmail,
    verifyPasswordResetEmail,
    resetPassword,
    register,
    validateStaffRegistration,
    closeLead,
    search,
    filteredSearch
}