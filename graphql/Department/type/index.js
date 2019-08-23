const graphql = require('graphql');
const { NonNull } = require('../../utils');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = graphql;

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
        }
    })
});

/** Input fields for queries and mutations **/
module.exports.inputFields = {
    department: {
        id: {type: NonNull(GraphQLID)},
        companyId: {type: NonNull(GraphQLID)}
    },
    createDepartment:{
        name: {type: NonNull(GraphQLString)},
        companyId: {type: NonNull(GraphQLID)}
    }
};