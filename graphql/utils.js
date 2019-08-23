const {GraphQLNonNull} = require('graphql');

module.exports.NonNull = function(type) {
    return new GraphQLNonNull(type);
};

module.exports.authenticated = function (resolver) {
    return function (parent, args, context, info) {
        let {user, error} = context;
        if (!user || error){
            error = error ? error : new Error("Internal error");
            throw(error);
        }else{
            return resolver(parent, args, context, info)
        }
    }
};