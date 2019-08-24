const { SiteType, inputFields } = require('../type');
const { createSiteResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');

/** Mutations definitions **/
const createSite = {
    type: SiteType,
    args: inputFields.createSite,
    resolve: authenticatedResolver(createSiteResolver)
};

/** Exports **/
module.exports = {
    createSite
};