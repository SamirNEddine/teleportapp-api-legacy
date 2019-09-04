const OpenTok = require('opentok');

const openTok = new OpenTok(process.env.OPEN_TOK_API_KEY, process.env.OPEN_TOK_API_SECRET);

module.exports.createNewSession = function(){
    return new Promise(function(resolve, reject){
        openTok.createSession({mediaMode:"routed"}, function(err, session){
            if(err){
                reject(err);
            }else{
                resolve(session.sessionId);
            }
        });
    });
};

module.exports.generateTokenForSession = function(sessionId){
    return openTok.generateToken(sessionId);
};