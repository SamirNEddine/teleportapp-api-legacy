const { DepartmentType, inputFields } = require('../type');
const { createDepartmentResolver } = require('./resolvers');
const { authenticated } = require('../../utils');

/** Mutations definitions **/
const createDepartment = {
    type: DepartmentType,
    args: inputFields.createDepartment,
    resolve: authenticated(createDepartmentResolver)
};

/** Exports **/
module.exports = {
    createDepartment
};