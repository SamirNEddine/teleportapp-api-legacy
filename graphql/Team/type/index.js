const graphql = require('graphql');
const { NonNull } = require('../../utils');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} = graphql;

/** Type definition **/
//Exports soon enough to overcome circular dependencies issues
module.exports.TeamType = new GraphQLObjectType({
    name: 'Team',
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
    team: {
        id: {type: NonNull(GraphQLID)},
        companyId: {type: NonNull(GraphQLID)}
    },
    createTeam:{
        name: {type: NonNull(GraphQLString)},
        companyId: {type: NonNull(GraphQLID)}
    }
};