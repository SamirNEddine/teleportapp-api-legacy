const { DepartmentType, inputFields } = require('../type');
const { departmentResolver } = require('./resolvers');

/** Queries definitions **/
const department = {
    type: DepartmentType,
    args: inputFields.department,
    resolve: departmentResolver
};

/** Exports **/
module.exports = {
    department
};