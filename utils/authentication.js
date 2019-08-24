
/** GraphQL authentication protection through a higher order function on resolvers **/
module.exports.authenticatedResolver = function (resolver) {
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