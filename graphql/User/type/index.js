const graphql = require('graphql');
const { NonNull } = require('../../../utils/graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt
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
    nestedUserTeamResolver,
    nestedStatusResolver
} = require('./nestedResolvers');

/** Type definition **/
//Exports soon enough to overcome circular dependencies issues
module.exports.UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: NonNull(GraphQLInt)
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
            type: GraphQLString
        },
        profilePicture: {
            type: GraphQLString
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
        },
        status: {
            type: GraphQLString,
            resolve: nestedStatusResolver
        }
    })
});

module.exports.UserVoxeetTokens = new GraphQLObjectType({
    name: 'UserVoxeetTokens',
    fields: () => ({
        accessToken: {
            type: NonNull(GraphQLString)
        },
        refreshToken: {
            type: NonNull(GraphQLString)
        }
    })
});

/** Input fields for queries and mutations **/
module.exports.inputFields = {
    user: {
        id: {type: GraphQLInt},
        companyId: {type: GraphQLID}
    },
    users: {
        companyId: {type: GraphQLID}
    },
    userAgoraToken: {
        channel:{type: NonNull(GraphQLString)}
    },
    userOpenTalkToken: {
        sessionId:{type: NonNull(GraphQLString)}
    },
    refreshUserVoxeetAccessToken: {
        refreshToken:{type: NonNull(GraphQLString)}
    },
    singUpUser:{
        firstName: {type: NonNull(GraphQLString)},
        lastName: {type: NonNull(GraphQLString)},
        email: {type: NonNull(GraphQLString)},
        password: {type: NonNull(GraphQLString)},
        companyId: {type: NonNull(GraphQLID)},
        jobTitle: {type: GraphQLString},
        profilePicture: {type: GraphQLString},
        departmentId: {type: GraphQLID},
        siteId: {type: GraphQLID},
        teamId: {type: GraphQLID}
    },
    loginUser:{
        email: {type: NonNull(GraphQLString)},
        password: {type: NonNull(GraphQLString)}
    }
};