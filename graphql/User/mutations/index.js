const graphql = require('graphql');
const { inputFields } = require('../type');
const { createUserResolver, loginUserResolver } = require('./resolvers');

const {
    GraphQLString
} = graphql;

/** Mutations definitions **/
const createUser = {
    type: GraphQLString,
    args: inputFields.createUser,
    resolve: createUserResolver
};
const loginUser = {
    type: GraphQLString,
    args: inputFields.loginUser,
    resolve: loginUserResolver
};

/** Exports **/
module.exports = {
    createUser,
    loginUser
};