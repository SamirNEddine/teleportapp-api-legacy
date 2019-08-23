const graphql = require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType
} = graphql;

/** Types **/
const Company = require('./Company');

/** Queries **/
const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        ...Company.queries,
    }
});

/** Mutations **/
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...Company.mutations,
    }
});

/** Schema **/
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});