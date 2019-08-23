const graphql = require('graphql');
const { NonNull } = require('../../utils');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} = graphql;

/** Nested types **/
const { CompanyType } = require('../../Company');
const { DepartmentType } = require('../../Department');
const { SiteType } = require('../../Site');
const { TeamType } = require('../../Team');

/** Nested resolvers **/
const {
    nestedUserCompanyResolver,
    nestedUserDepartmentResolver,
    nestedUserSiteResolver,
    nestedUserTeamResolver
} = require('./nestedResolvers');

/** Type definition **/
//Exports soon enough to overcome circular dependencies issues
module.exports.UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: NonNull(GraphQLID)
        },
        firstName: {
            type: NonNull(GraphQLString)
        },
        lastName: {
            type: NonNull(GraphQLString)
        },
        email: {
            type: NonNull(GraphQLString)
        },
        password: {
            type: GraphQLString
        },
        jobTitle: {
            type: NonNull(GraphQLString)
        },
        company: {
            type: NonNull(CompanyType),
            resolve: nestedUserCompanyResolver
        },
        department: {
            type: DepartmentType,
            resolve: nestedUserDepartmentResolver
        },
        site: {
            type: SiteType,
            resolve: nestedUserSiteResolver
        },
        team: {
            type: TeamType,
            resolve: nestedUserTeamResolver
        }
    })
});

/** Input fields for queries and mutations **/
module.exports.inputFields = {
    user: {
        id: {type: NonNull(GraphQLID)}
    },
    createUser:{
        firstName: {type: NonNull(GraphQLString)},
        lastName: {type: NonNull(GraphQLString)},
        email: {type: NonNull(GraphQLString)},
        password: {type: NonNull(GraphQLString)},
        companyId: {type: NonNull(GraphQLID)},
        jobTitle: {type: GraphQLString},
        departmentId: {type: GraphQLID},
        siteId: {type: GraphQLID},
        teamId: {type: GraphQLID}
    },
    loginUser:{
        email: {type: NonNull(GraphQLString)},
        password: {type: NonNull(GraphQLString)}
    }
};