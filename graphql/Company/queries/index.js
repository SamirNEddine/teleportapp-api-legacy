const { CompanyType, inputFields } = require('../type');
const { companyResolver } = require('./resolvers');
const { authenticated } = require('../../utils');

/** Queries definitions **/
const company = {
    type: CompanyType,
    args: inputFields.company,
    resolve: authenticated(companyResolver)
};

/** Exports **/
module.exports = {
    company
};