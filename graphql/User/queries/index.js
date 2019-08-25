const graphql = require('graphql');
const { UserType, inputFields } = require('../type');
const { userResolver, usersResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver } = require('../../../utils/authorization');

const {
    GraphQLList
} = graphql;

/** Queries definitions **/
const user = {
    type: UserType,
    args: inputFields.user,
    resolve: authorizedResolver(authenticatedResolver(userResolver))
};
const users = {
    type: GraphQLList(UserType),
    args: inputFields.users,
    resolve: authorizedResolver(authenticatedResolver(usersResolver))
};

/** Exports **/
module.exports = {
    user,
    users
};