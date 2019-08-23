const { DepartmentType, inputFields } = require('../type');
const { departmentResolver } = require('./resolvers');
const { authenticated } = require('../../utils');

/** Queries definitions **/
const department = {
    type: DepartmentType,
    args: inputFields.department,
    resolve: authenticated(departmentResolver)
};

/** Exports **/
module.exports = {
    department
};