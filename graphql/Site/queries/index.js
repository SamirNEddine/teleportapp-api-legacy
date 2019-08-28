const { SiteType, inputFields } = require('../type');
const { siteResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver } = require('../../../utils/authorization');

/** Queries definitions **/
const site = {
    type: SiteType,
    args: inputFields.site,
    resolve: authenticatedResolver(authorizedResolver(siteResolver))
};

/** Exports **/
module.exports = {
    site
};