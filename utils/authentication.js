const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

/** Constants **/
const AUTH_MODE_PREFIX = module.exports.AUTH_MODE_PREFIX = 'Bearer ';

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

/** Password hashing and verification **/
module.exports.hashPassword = async function (password) {
    return argon2.hash(password, argon2.argon2id);
};
module.exports.verifyPassword = async function (password, hash) {
    return argon2.verify(hash, password);
};

/** JWT **/
class JWTUser {
    constructor(userId, email, companyId){
        this.id = userId;
        this.email = email;
        this.companyId = companyId;
    }
    static JWTUserFromPayload({user}){
        return new JWTUser(user.id, user.email, user.companyId);
    }
    toPlainObject(){
        return Object.assign({}, this);
    }
}
module.exports.JWTUser = JWTUser;
module.exports.getJWTForUser = async function (userId, email, companyId) {
    const jwtUser = new JWTUser(userId, email, companyId);
    return jwt.sign({user: jwtUser.toPlainObject()}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
};
module.exports.getPayloadFromJWT = async function (token) {
    return jwt.verify(token, process.env.JWT_SECRET);
};