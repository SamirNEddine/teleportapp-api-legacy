const graphql = require('graphql');
const { UserType, inputFields, UserVoxeetTokens } = require('../type');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver } = require('../../../utils/authorization');
const {
    userResolver,
    usersResolver,
    userAgoraTokenResolver,
    openTokSessionResolver,
    userOpenTalkTokenResolver,
    userVoxeetAccessTokensResolver,
    refreshUserVoxeetAccessTokensResolver,
    invalidateUserVoxeetAccessTokenResolver,
    recommendedContactsResolver,
    searchUsersResolver
} = require('./resolvers');

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
const invalidateUserVoxeetAccessToken = {
    type: GraphQLString,
    args: inputFields.invalidateUserVoxeetAccessToken,
    resolve: authenticatedResolver(authorizedResolver(invalidateUserVoxeetAccessTokenResolver))
};
const recommendedContacts = {
    type: GraphQLList(UserType),
    resolve: authenticatedResolver(authorizedResolver(recommendedContactsResolver))
};
const searchUsers = {
    type: GraphQLList(UserType),
    args: inputFields.searchUsers,
    resolve: authenticatedResolver(authorizedResolver(searchUsersResolver))
};

/** Exports **/
module.exports = {
    user,
    users,
    userAgoraToken,
    openTokSession,
    userOpenTalkToken,
    userVoxeetAccessToken,
    refreshUserVoxeetAccessToken,
    invalidateUserVoxeetAccessToken,
    recommendedContacts,
    searchUsers
};