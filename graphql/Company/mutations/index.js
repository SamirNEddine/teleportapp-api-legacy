const { CompanyType, inputFields } = require('../type');
const { createCompanyResolver } = require('./resolvers');

/** Mutations definitions **/
const createCompany = {
    type: CompanyType,
    args: inputFields.createCompany,
    resolver: createCompanyResolver
};

/** Exports **/
module.exports = {
  createCompany
};