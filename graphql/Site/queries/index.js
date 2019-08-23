const { SiteType, inputFields } = require('../type');
const { siteResolver } = require('./resolvers');
const { authenticated } = require('../../utils');

/** Queries definitions **/
const site = {
    type: SiteType,
    args: inputFields.site,
    resolve: authenticated(siteResolver)
};

/** Exports **/
module.exports = {
    site
};