const { CompanyType, inputFields } = require('../type');
const { companyResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver } = require('../../../utils/authorization');

/** Queries definitions **/
const company = {
    type: CompanyType,
    args: inputFields.company,
    resolve: authenticatedResolver(authorizedResolver(companyResolver))
};

/** Exports **/
module.exports = {
    company
};