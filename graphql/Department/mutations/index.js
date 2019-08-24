const { DepartmentType, inputFields } = require('../type');
const { createDepartmentResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');

/** Mutations definitions **/
const createDepartment = {
    type: DepartmentType,
    args: inputFields.createDepartment,
    resolve: authenticatedResolver(createDepartmentResolver)
};

/** Exports **/
module.exports = {
    createDepartment
};