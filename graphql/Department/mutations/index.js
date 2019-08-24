const { DepartmentType, inputFields } = require('../type');
const { createDepartmentResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver, AccessLevels } = require('../../../utils/authorization');

/** Mutations definitions **/
const createDepartment = {
    type: DepartmentType,
    args: inputFields.createDepartment,
    resolve: authorizedResolver(authenticatedResolver(createDepartmentResolver), AccessLevels.ADMIN)
};

/** Exports **/
module.exports = {
    createDepartment
};