const graphql = require('graphql');
const { inputFields } = require('../type');
const { singUpUserResolver, loginUserResolver } = require('./resolvers');

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

/** Exports **/
module.exports = {
    singUpUser,
    loginUser
};