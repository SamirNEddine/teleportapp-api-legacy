const { JWTUser } = require('./authentication');
const User = require('../mongo/models/User');

const AccessLevels = module.exports.AccessLevels = {
    USER: 'user',
    ADMIN: 'admin',
    SUPER_ADMIN: 'superAdmin'
};
/*
Authorization rules:
    - users can access resources of their own companies (defined in their JWTs) in readonly mode
    - admins can access resources of their own companies (defined in their JWTs) in read-write mode
    - superAdmins can access resources of any company (passed as an input parameter) in read-write mode. They are Teleport internal employees.
 */

/** GraphQL authorization protection through a higher order function on resolvers **/
module.exports.authorizedResolver = function (resolver, accessLevel=AccessLevels.USER) {
    return async function (parent, args, context, info) {
        const { user } = context;//Of class JWTUser
        if (!user) throw(new Error("Internal error"));//This shouldn't happen as it should have passed through the authentication verification
        const companyIdInput = args.companyId;
        let isSuperAdmin = false;//To avoid double verification in some cases
        if (companyIdInput && companyIdInput !== user.companyId){
            //For any request and any accessLevel. If a different companyId is provided in the request parameters. Only superAdmins can pass.
            isSuperAdmin = await verifyAccessLevel(user.userId, companyIdInput, AccessLevels.SUPER_ADMIN);
            if (!isSuperAdmin) throw(new Error("Unauthorized Access"));
        }
        //For superAdmins, no need to go further.
        if (!isSuperAdmin && ! await verifyAccessLevel(user.userId, user.companyId, accessLevel)) {
            throw(new Error("Unauthorized Access"));
        }
        return resolver(parent, args, context, info)
    }
};
async function verifyAccessLevel(userId, companyId, accessLevel=AccessLevels.USER) {
    try{
        const user = await User.findById(userId);
        switch (accessLevel) {
            case AccessLevels.USER:
                return (user.role === AccessLevels.SUPER_ADMIN || user.companyId.toString() === companyId);//Memo: The second part shouldn't happen
            case AccessLevels.ADMIN:
                return (user.role === AccessLevels.SUPER_ADMIN || (user.role === AccessLevels.ADMIN && user.companyId.toString() === companyId)); //Memo: The second part of the second part shouldn't happen
            case AccessLevels.SUPER_ADMIN:
                return (user.role === AccessLevels.SUPER_ADMIN);
        }
    }catch(error){
        console.debug(error);
        return false;
    }
    return false;
}