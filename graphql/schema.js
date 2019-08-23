const graphql = require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType
} = graphql;

/** Types **/
const Company = require('./Company');
const Department = require('./Department');
const Site = require('./Site');

/** Queries **/
const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        ...Company.queries,
        ...Department.queries,
        ...Site.queries
    }
});

/** Mutations **/
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...Company.mutations,
        ...Department.mutations,
        ...Site.mutations
    }
});

/** Schema **/
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});