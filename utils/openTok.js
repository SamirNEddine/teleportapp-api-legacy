const OpenTok = require('opentok');

const openTok = new OpenTok(process.env.OPEN_TOK_API_KEY, process.env.OPEN_TOK_API_SECRET);

module.exports.createNewSession = function(){
    return new Promise(function(resolve, reject){
        openTok.createSession({mediaMode:"routed"}, function(err, session){
            if(err){
                reject(err);
            }else{
                console.debug(`New session created: ${session.sessionId}`);
                resolve(session.sessionId);
            }
        });
    });
};

module.exports.generateTokenForSession = function(sessionId){
    console.debug(`Generating new token for: ${sessionId}`);
    return openTok.generateToken(sessionId);
};