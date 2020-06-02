
const createRole = require('./createRole')
const updateRole = require('./updateRole')
const deleteRole = require('./deleteRole')
const createRight = require('./createRight')
const updateRight = require('./updateRight')
const deleteRight = require('./deleteRight')
const createProduct = require('./createProduct')
const updateProduct = require('./updateProduct')
const deleteProduct = require('./deleteProduct')
const sendStaffApprovalEmail = require('./sendStaffApprovalEmail')
const setStaffStatus = require('./setStaffStatus')

module.exports = {
    sendStaffApprovalEmail,
    setStaffStatus,
    createRole,
    updateRole,
    deleteRole,
    createRight,
    updateRight,
    deleteRight,
    createProduct,
    updateProduct,
    deleteProduct
}