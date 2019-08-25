const graphql = require('graphql');
const { UserType, inputFields } = require('../type');
const { userResolver, usersResolver, userAgoraTokenResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver } = require('../../../utils/authorization');

const {
    GraphQLList,
    GraphQLString
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
const userAgoraToken = {
    type: GraphQLString,
    resolve: authorizedResolver(authenticatedResolver(userAgoraTokenResolver))
};

/** Exports **/
module.exports = {
    user,
    users,
    userAgoraToken
};