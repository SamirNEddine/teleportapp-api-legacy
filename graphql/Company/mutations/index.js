const { CompanyType, inputFields } = require('../type');
const { createCompanyResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');

/** Mutations definitions **/
const createCompany = {
    type: CompanyType,
    args: inputFields.createCompany,
    resolve: authenticatedResolver(createCompanyResolver)
};

/** Exports **/
module.exports = {
    createCompany
};