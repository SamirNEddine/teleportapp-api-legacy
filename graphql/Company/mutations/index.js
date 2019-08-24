const { CompanyType, inputFields } = require('../type');
const { createCompanyResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver, AccessLevels } = require('../../../utils/authorization');

/** Mutations definitions **/
const createCompany = {
    type: CompanyType,
    args: inputFields.createCompany,
    resolve: authorizedResolver(authenticatedResolver(createCompanyResolver), AccessLevels.SUPER_ADMIN)
};

/** Exports **/
module.exports = {
    createCompany
};