const { DepartmentType, inputFields } = require('../type');
const { departmentResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');

/** Queries definitions **/
const department = {
    type: DepartmentType,
    args: inputFields.department,
    resolve: authenticatedResolver(departmentResolver)
};

/** Exports **/
module.exports = {
    department
};