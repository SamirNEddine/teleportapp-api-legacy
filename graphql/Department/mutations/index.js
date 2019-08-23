const { DepartmentType, inputFields } = require('../type');
const { createDepartmentResolver } = require('./resolvers');

/** Mutations definitions **/
const createDepartment = {
    type: DepartmentType,
    args: inputFields.createDepartment,
    resolve: createDepartmentResolver
};

/** Exports **/
module.exports = {
    createDepartment
};