
const registerStaff = require('./registerStaff')
const validateStaffRegistration = require('./validateStaffRegistration')
const changeStaffProfilePhoto = require('./changeStaffProfilePhoto')
const createRole = require('./createRole')
const updateRole = require('./updateRole')
const deleteRole = require('./deleteRole')
const createRight = require('./createRight')
const updateRight = require('./updateRight')
const deleteRight = require('./deleteRight')
const createProduct = require('./createProduct')
const updateProduct = require('./updateProduct')
const deleteProduct = require('./deleteProduct')

module.exports = {
    validateStaffRegistration,
    registerStaff,
    changeStaffProfilePhoto,
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