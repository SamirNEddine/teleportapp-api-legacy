const graphql = require('graphql');
const { UserType, inputFields, UserVoxeetTokens } = require('../type');
const { userResolver, usersResolver, userAgoraTokenResolver, openTokSessionResolver, userOpenTalkTokenResolver, userVoxeetAccessTokensResolver, refreshUserVoxeetAccessTokensResolver } = require('./resolvers');
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
const openTokSession = {
    type: GraphQLString,
    resolve: authenticatedResolver(authorizedResolver(openTokSessionResolver))
};
const userOpenTalkToken = {
    type: GraphQLString,
    args: inputFields.userOpenTalkToken,
    resolve: authenticatedResolver(authorizedResolver(userOpenTalkTokenResolver))
};
const userVoxeetAccessToken = {
    type: UserVoxeetTokens,
    resolve: authenticatedResolver(authorizedResolver(userVoxeetAccessTokensResolver))
};
const refreshUserVoxeetAccessToken = {
    type: GraphQLString,
    args: inputFields.refreshUserVoxeetAccessToken,
    resolve: authenticatedResolver(authorizedResolver(refreshUserVoxeetAccessTokensResolver))
};

/** Exports **/
module.exports = {
    user,
    users,
    userAgoraToken,
    openTokSession,
    userOpenTalkToken,
    userVoxeetAccessToken,
    refreshUserVoxeetAccessToken
};