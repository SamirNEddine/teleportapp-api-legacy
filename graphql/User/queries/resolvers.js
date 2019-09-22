const User = require('../../../mongo/models/User');
const { generateAgoraToken } = require('../../../utils/agoraToken');
const { createNewSession, generateTokenForSession } = require('../../../utils/openTok');
const { trackEvent, AnalyticsEvents } = require('../../../utils/analytics');

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
        const session =  await createNewSession();
        trackEvent(AnalyticsEvents.CREATE_CONVERSATION, {conversationId: session}, user);
        return session;
    }catch(error){
        console.error(error);
        throw(error);
    }
};

module.exports.userOpenTalkTokenResolver = function(_, {sessionId}) {
    return generateTokenForSession(sessionId);
};