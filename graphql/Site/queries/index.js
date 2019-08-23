const { SiteType, inputFields } = require('../type');
const { siteResolver } = require('./resolvers');

/** Queries definitions **/
const site = {
    type: SiteType,
    args: inputFields.site,
    resolve: siteResolver
};

/** Exports **/
module.exports = {
    site
};