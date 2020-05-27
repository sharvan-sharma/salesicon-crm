const Staff = require('./staff.js')
const Lead = require('./lead')
const LeadInteractions = require('./lead_interaction')
const LeadResponse = require('./lead_response')
const Products =require('./products')
const Roles =require('./roles')
const StaffRole =require('./staff_role_mapping')
const Rights = require('./rights')
const RoleRights = require('./role_rights_mapping')
const Admin = require('./admins')
const Campaigns = require('./campaigns')


module.exports = {
    Campaigns,
    Staff,
    Admin,
    Lead,
    LeadInteractions,
    LeadResponse,
    Products,
    Roles,
    StaffRole,
    Rights,
    RoleRights
}