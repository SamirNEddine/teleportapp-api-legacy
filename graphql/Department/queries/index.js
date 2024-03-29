const { DepartmentType, inputFields } = require('../type');
const { departmentResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver } = require('../../../utils/authorization');

/** Queries definitions **/
const department = {
    type: DepartmentType,
    args: inputFields.department,
    resolve: authenticatedResolver(authorizedResolver(departmentResolver))
};

/** Exports **/
module.exports = {
    department
};