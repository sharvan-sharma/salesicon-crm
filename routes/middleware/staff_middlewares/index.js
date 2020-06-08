const createLead = require('./createLead')
const createCampaign = require('./createCampaign')
const createLeadInteraction = require('./createLeadInteraction')
const createMultipleLeads = require('./createMultipleLeads')
const register = require('./register')
const validateStaffRegistration = require('./validateStaffRegistration')
const verify = require('../admin_middlewares/verify')
const readAllCampaigns = require('./readAllCampaigns')
const editCampaign = require('./editCampaign')
const changeCampaignStatus = require('./changeCampaignStatus')
const deleteCampaign = require('./deleteCampaign')
const readAllLeads = require('./readAllLeads')
const readLeadInteractions = require('./readLeadInteractions')
const changeStatus = require('./changeStatus')
const search = require('./search')
const filteredSearch = require('./filteredSearch')
const verifyToken = require('./verifyToken')
const updateReminder = require('./updateReminder')

module.exports = {
    verifyToken,
    updateReminder,
    readLeadInteractions,
    readAllLeads,
    deleteCampaign,
    changeCampaignStatus,
    editCampaign,
    readAllCampaigns,
    verify,
    createLead,
    createCampaign,
    createLeadInteraction,
    createMultipleLeads,
    register,
    validateStaffRegistration,
    changeStatus,
    search,
    filteredSearch
}