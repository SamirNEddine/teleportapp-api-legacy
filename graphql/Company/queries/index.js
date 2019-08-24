const { CompanyType, inputFields } = require('../type');
const { companyResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');

/** Queries definitions **/
const company = {
    type: CompanyType,
    args: inputFields.company,
    resolve: authenticatedResolver(companyResolver)
};

/** Exports **/
module.exports = {
    company
};