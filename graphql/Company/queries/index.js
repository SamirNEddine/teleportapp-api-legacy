const { CompanyType, inputFields } = require('../type');
const { companyResolver } = require('./resolvers');

/** Queries definitions **/
const company = {
    type: CompanyType,
    args: inputFields.company,
    resolve: companyResolver
};

/** Exports **/
module.exports = {
    company
};