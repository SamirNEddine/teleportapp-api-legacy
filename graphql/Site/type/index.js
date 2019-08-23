const graphql = require('graphql');
const { NonNull } = require('../../utils');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} = graphql;

/** Nested Address type **/
const AddressType = new GraphQLObjectType({
    name: 'Address',
    fields: () => ({
        streetAddress: {
            type: NonNull(GraphQLString)
        },
        zipCode: {
            type: NonNull(GraphQLString)
        },
        city: {
            type: NonNull(GraphQLString)
        },
        country: {
            type: NonNull(GraphQLString)
        }
    })
});

/** Type definition **/
//Exports soon enough to overcome circular dependencies issues
module.exports.SiteType = new GraphQLObjectType({
    name: 'Site',
    fields: () => ({
        id: {
            type: NonNull(GraphQLID)
        },
        name: {
            type: NonNull(GraphQLString)
        },
        address: {
            type: NonNull(AddressType)
        },
        isHeadquarter:{
            type: NonNull(GraphQLBoolean)
        }
    })
});

/** Input fields for queries and mutations **/
module.exports.inputFields = {
    site: {
        id: {type: NonNull(GraphQLID)},
        companyId: {type: NonNull(GraphQLID)}
    },
    createSite:{
        name: {type: NonNull(GraphQLString)},
        streetAddress: {type: NonNull(GraphQLString)},
        zipCode: {type: NonNull(GraphQLString)},
        city: {type: NonNull(GraphQLString)},
        country: {type: NonNull(GraphQLString)},
        isHeadquarter: {type: GraphQLBoolean},
        companyId: {type: NonNull(GraphQLID)}
    }
};