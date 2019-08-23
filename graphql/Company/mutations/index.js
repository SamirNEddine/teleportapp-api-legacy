const { CompanyType, inputFields } = require('../type');
const { createCompanyResolver } = require('./resolvers');
const { authenticated } = require('../../utils');

/** Mutations definitions **/
const createCompany = {
    type: CompanyType,
    args: inputFields.createCompany,
    resolve: authenticated(createCompanyResolver)
};

/** Exports **/
module.exports = {
    createCompany
};