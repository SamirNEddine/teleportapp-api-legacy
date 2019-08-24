const graphql = require('graphql');
const { NonNull } = require('../../../utils/graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = graphql;

/** Nested types **/
const { DepartmentType } = require('../../Department');
const { SiteType } = require('../../Site');
const { TeamType } = require('../../Team');

/** Type definition **/
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
            type: GraphQLList(SiteType)
        },
        departments: {
            type: GraphQLList(DepartmentType)
        },
        teams:{
            type: GraphQLList(TeamType)
        }
    })
});

/** Input fields for queries and mutations **/
module.exports.inputFields = {
    company: {
        companyId: {type: GraphQLID}
    },
    createCompany:{
        name: {type: NonNull(GraphQLString)},
        website: {type: GraphQLString},
        logo: {type: GraphQLString}
    }
};