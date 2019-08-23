const { UserType, inputFields } = require('../type');
const { userResolver } = require('./resolvers');
const { authenticated } = require('../../utils');

/** Queries definitions **/
const user = {
    type: UserType,
    args: inputFields.user,
    resolve: authenticated(userResolver)
};

/** Exports **/
module.exports = {
    user
};