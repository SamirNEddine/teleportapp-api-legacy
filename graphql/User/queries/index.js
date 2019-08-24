const { UserType, inputFields } = require('../type');
const { userResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver } = require('../../../utils/authorization');

/** Queries definitions **/
const user = {
    type: UserType,
    args: inputFields.user,
    resolve: authorizedResolver(authenticatedResolver(userResolver))
};

/** Exports **/
module.exports = {
    user
};