const graphql = require('graphql');
const { inputFields } = require('../type');
const { singUpUserResolver, loginUserResolver, forceIdentifyUsers } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver, AccessLevels } = require('../../../utils/authorization');

const {
    GraphQLString
} = graphql;

/** Mutations definitions **/
const singUpUser = {
    type: GraphQLString,
    args: inputFields.singUpUser,
    resolve: singUpUserResolver
};
const loginUser = {
    type: GraphQLString,
    args: inputFields.loginUser,
    resolve: loginUserResolver
};
const superAdminForceIdentifyUsers = {
    type: GraphQLString,
    resolve: authenticatedResolver(authorizedResolver(forceIdentifyUsers, AccessLevels.SUPER_ADMIN))
};

/** Exports **/
module.exports = {
    singUpUser,
    loginUser,
    superAdminForceIdentifyUsers
};