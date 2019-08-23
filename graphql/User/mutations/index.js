const { UserType, inputFields } = require('../type');
const { createUserResolver, loginUserResolver } = require('./resolvers');

/** Mutations definitions **/
const createUser = {
    type: UserType,
    args: inputFields.createUser,
    resolve: createUserResolver
};

const loginUser = {
    type: UserType,
    args: inputFields.loginUser,
    resolve: loginUserResolver
};

/** Exports **/
module.exports = {
    createUser,
    loginUser
};