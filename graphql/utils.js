const {GraphQLNonNull} = require('graphql');

module.exports.NonNull = function(type) {
    return new GraphQLNonNull(type);
};