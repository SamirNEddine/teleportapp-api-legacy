const ApiError = require('../utils/apiError');
const { AUTH_MODE_PREFIX, getPayloadFromJWT, JWTUser } = require('../utils/authentication');

async function verifyToken(authorization, req, next){
    const token = authorization && authorization.startsWith(AUTH_MODE_PREFIX) ? authorization.slice(AUTH_MODE_PREFIX.length, authorization.length) : null;
    if (token){
        try{
            const payload = await getPayloadFromJWT(token);
            req.user = JWTUser.JWTUserFromPayload(payload);
            req.error = null;
        }catch(error){
            console.error(error);
            req.error = ApiError.UNAUTHORIZED_ERROR(error.message);
        }
    }else{
        req.error = ApiError.UNAUTHORIZED_ERROR('No Authorization token found');
    }
    next();
}

module.exports.httpRequestAuth = async function (req, rest, next) {
    await verifyToken(req.header('authorization'), req, next);
};

module.exports.socketAuth = async function (socket, next) {
    await  verifyToken(socket.handshake.query.token, socket.handshake.query, next);
    if (socket.handshake.query.error){
        console.error(socket.handshake.query.error);
        next(socket.handshake.query.error);
    }
};