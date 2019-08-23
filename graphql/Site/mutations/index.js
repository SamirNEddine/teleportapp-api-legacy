const { SiteType, inputFields } = require('../type');
const { createSiteResolver } = require('./resolvers');

/** Mutations definitions **/
const createSite = {
    type: SiteType,
    args: inputFields.createSite,
    resolve: createSiteResolver
};

/** Exports **/
module.exports = {
    createSite
};