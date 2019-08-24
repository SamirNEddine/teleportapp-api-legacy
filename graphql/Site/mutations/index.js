const { SiteType, inputFields } = require('../type');
const { createSiteResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver, AccessLevels } = require('../../../utils/authorization');

/** Mutations definitions **/
const createSite = {
    type: SiteType,
    args: inputFields.createSite,
    resolve: authorizedResolver(authenticatedResolver(createSiteResolver), AccessLevels.ADMIN)
};

/** Exports **/
module.exports = {
    createSite
};