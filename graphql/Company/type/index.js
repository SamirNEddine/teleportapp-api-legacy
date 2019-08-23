const graphql = require('graphql');
const { NonNull } = require('../../utils');
const { DepartmentType } = require('../../Department');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = graphql;

/** Nested resolvers **/
const {
    nestedCompanySites,
    nestedCompanyDepartments
} = require('./nestedResolvers');

/** Type definition **/
//Exports soon enough to overcome circular dependencies issues
module.exports.CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: {
            type: NonNull(GraphQLID)
        },
        name: {
            type: NonNull(GraphQLString)
        },
        website: {
            type: GraphQLString
        },
        logo: {
            type: GraphQLString
        },
        sites: {
            type: GraphQLList(GraphQLString),
            resolve: nestedCompanySites
        },
        departments: {
            type: GraphQLList(DepartmentType),
            resolve: nestedCompanyDepartments
        }
    })
});

/** Input fields for queries and mutations **/
module.exports.inputFields = {
    company: {
        id: {type: NonNull(GraphQLID)}
    },
    createCompany:{
        name: {type: NonNull(GraphQLString)},
        website: {type: GraphQLString},
        logo: {type: GraphQLString}
    }
};