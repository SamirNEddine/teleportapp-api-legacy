const { SiteType, inputFields } = require('../type');
const { siteResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');

/** Queries definitions **/
const site = {
    type: SiteType,
    args: inputFields.site,
    resolve: authenticatedResolver(siteResolver)
};

/** Exports **/
module.exports = {
    site
};