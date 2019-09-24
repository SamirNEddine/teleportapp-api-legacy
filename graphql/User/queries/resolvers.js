const User = require('../../../mongo/models/User');
const { generateAgoraToken } = require('../../../utils/agoraToken');
const { createNewSession, generateTokenForSession } = require('../../../utils/openTok');
const { getVoxeetTokens, refreshVoxeetToken, invalidateVoxeetAccessToken } = require('../../../utils/voxeet');

module.exports.userResolver = async function (_, {id}, {user}) {
    try{
        id = id ? id : user.id;
        const theUser = await User.findById(id);
        return {...theUser._doc, id:theUser._id, password: ''}
    }catch(error){
        console.error(error);
        throw(error);
    }
};
module.exports.usersResolver = async function (_, {companyId}, {user}) {
    try{
        companyId = companyId ? companyId : user.companyId;
        let users = await User.find({companyId});
        //Remove me
        users = users.filter(u => {
            return u._id !== user.id;
        });
        return users.map( u => {
            u.password = '';
            return u;
        });
    }catch(error){
        console.error(error);
        throw(error);
    }
};
module.exports.userAgoraTokenResolver = async function (_, {channel}, {user}) {
    try{
        return await generateAgoraToken(channel, user.id);
    }catch(error){
        console.error(error);
        throw(error);
    }
};
module.exports.openTokSessionResolver = async function(_, args, {user}) {
    try{
        return await createNewSession();
    }catch(error){
        console.error(error);
        throw(error);
    }
};
module.exports.userOpenTalkTokenResolver = function(_, {sessionId}) {
    return generateTokenForSession(sessionId);
};
module.exports.userVoxeetAccessTokensResolver = async function () {
    try{
        return await getVoxeetTokens();
    }catch(error){
        console.error(error);
        throw(error);
    }
};
module.exports.refreshUserVoxeetAccessTokensResolver = async function (_, {refreshToken}) {
    try{
        return await refreshVoxeetToken(refreshToken);
    }catch(error){
        console.error(error);
        throw(error);
    }
};
module.exports.invalidateUserVoxeetAccessTokenResolver = async function (_, {accessToken}) {
    try{
        return await invalidateVoxeetAccessToken(accessToken);
    }catch(error){
        console.error(error);
        throw(error);
    }
};