const jwt = require('jsonwebtoken');
const AUTH_MODE_PREFIX = 'Bearer ';

module.exports = async function (req, rest, next) {
    const authorization = req.header('authorization');
    const token = authorization && authorization.startsWith(AUTH_MODE_PREFIX) ? authorization.slice(AUTH_MODE_PREFIX.length, authorization.length) : null;
    if (token){
        try{
            const user = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            req.error = null;
        }catch(error){
            console.error(error);
            req.error = error;
        }
    }else{
        req.error = new Error("No Authorization token found");
    }
    next();
};