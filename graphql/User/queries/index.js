const { UserType, inputFields } = require('../type');
const { userResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');

/** Queries definitions **/
const user = {
    type: UserType,
    args: inputFields.user,
    resolve: authenticatedResolver(userResolver)
};

/** Exports **/
module.exports = {
    user
};