const { AccessToken } = require('agora-access-token');
const {Token, Priviledges} = AccessToken;

module.exports.generateAgoraToken = function (channel, userId) {
    const key = new Token(process.env.AGORA_APP_ID, process.env.AGORA_APP_CERTIFICATE, channel, userId);
    key.addPriviledge(Priviledges.kJoinChannel, 0);
    return key.build();
};