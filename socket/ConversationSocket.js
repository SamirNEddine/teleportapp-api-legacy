const { socketAuth } = require('../middleware/authentication');

const CONVERSATION_NAMESPACE = "conversation";

class ConversationSocket {
    constructor(io){
        this.socket = io.of('/'+CONVERSATION_NAMESPACE);
        //Authentication middleware
        this.socket.use(socketAuth);
    }
    listen(){
        this.socket.on('connection', function (socket) {
            console.log("Conversation Socket Connected: ", socket.handshake.query.userId);
        })
    }
}

module.exports = ConversationSocket;