const { UserType, inputFields } = require('../type');
const { userResolver } = require('./resolvers');

/** Queries definitions **/
const user = {
    type: UserType,
    args: inputFields.user,
    resolve: userResolver
};

/** Exports **/
module.exports = {
    user
};