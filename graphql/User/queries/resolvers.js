const User = require('../../../mongo/models/User');
const { generateAgoraToken } = require('../../../utils/agoraToken');
const { createNewSession, generateTokenForSession } = require('../../../utils/openTok');
const { getVoxeetTokens, refreshVoxeetToken, invalidateVoxeetAccessToken } = require('../../../utils/voxeet');
const mongoose = require('mongoose');

const RECOMMENDED_CONTACTS_PAGE_SIZE = 7;

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
module.exports.recommendedContactsResolver = async function (_, args, {user}) {
    try{
        const theUser = await User.findById(user.id);
        const recommendedContactsIds = theUser.recommendedContacts.map(c => (Number(c)));
        const contacts = [];
        if(recommendedContactsIds.length){
            const recommendedContacts = await User.aggregate([
                {$match: {'_id': { '$in': recommendedContactsIds}, 'companyId': mongoose.Types.ObjectId(user.companyId)}},
                {$addFields: {"__order": {$indexOfArray: [recommendedContactsIds, '$_id' ]}}},
                {$sort: {"__order": 1}}
            ]).exec();
            contacts.push(...recommendedContacts.map( c => {
                c.password = '';
                c.id = c._id;
                return c;
            }));
        }
        if(contacts.length < RECOMMENDED_CONTACTS_PAGE_SIZE){
            const remaining = RECOMMENDED_CONTACTS_PAGE_SIZE - contacts.length;
            const additionalContacts = await User.aggregate([
                {$match: {'_id': { '$nin': [...recommendedContactsIds, user.id]}, 'companyId': mongoose.Types.ObjectId(user.companyId)}}
            ]).limit(remaining).exec();
            contacts.push(...additionalContacts.map( c => {
                c.password = '';
                c.id = c._id;
                return c;
            }));
        }
        return contacts;
    }catch(error){
        console.error(error);
        throw(error);
    }
};
module.exports.searchUsersResolver = async function(_, {token, companyId}, {user}) {
    try {
        companyId = companyId ? companyId : user.companyId;
        let results = await User.find({
            companyId,
            $or: [{firstName: { $regex: `^${token}.*`, $options: "i" }}, {lastName: { $regex: `^${token}.*`, $options: "i" }}]
        });
        //Remove me
        results = results.filter(u => {
            return u._id !== user.id;
        });
        return results.map( u => {
            u.password = '';
            return u;
        });
    }catch(error){
        console.error(error);
        throw(error);
    }
};