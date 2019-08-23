const { SiteType, inputFields } = require('../type');
const { createSiteResolver } = require('./resolvers');
const { authenticated } = require('../../utils');

/** Mutations definitions **/
const createSite = {
    type: SiteType,
    args: inputFields.createSite,
    resolve: authenticated(createSiteResolver)
};

/** Exports **/
module.exports = {
    createSite
};