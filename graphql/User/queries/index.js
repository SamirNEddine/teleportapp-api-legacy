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
    resolve: authenticatedResolver(authorizedResolver(userResolver))
};
const users = {
    type: GraphQLList(UserType),
    args: inputFields.users,
        resolve: authenticatedResolver(authorizedResolver(usersResolver))
};
const userAgoraToken = {
    type: GraphQLString,
    args: inputFields.userAgoraToken,
    resolve: authenticatedResolver(authorizedResolver(userAgoraTokenResolver))
};

/** Exports **/
module.exports = {
    user,
    users,
    userAgoraToken
};