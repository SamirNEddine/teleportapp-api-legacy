const graphql = require('graphql');
const { NonNull } = require('../../utils');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} = graphql;

/** Nested resolvers **/
const {
    nestedDepartmentCompany
} = require('./nestedResolvers');

/** Type definition **/
//Exports soon enough to overcome circular dependencies issues
module.exports.DepartmentType = new GraphQLObjectType({
    name: 'Department',
    fields: () => ({
        id: {
            type: NonNull(GraphQLID)
        },
        name: {
            type: NonNull(GraphQLString)
        },
        company: {
            //Circular dependency workaround
            type: require('../../Company').CompanyType,
            resolve: nestedDepartmentCompany
        }
    })
});

/** Input fields for queries and mutations **/
module.exports.inputFields = {
    department: {
        id: {type: NonNull(GraphQLID)}
    },
    createDepartment:{
        name: {type: NonNull(GraphQLString)},
        companyId: {type: NonNull(GraphQLID)},
    }
};