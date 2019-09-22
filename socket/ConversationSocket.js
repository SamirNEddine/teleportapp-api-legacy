const { socketAuth } = require('../middleware/authentication');
const { trackEvent, AnalyticsEvents } = require('../utils/analytics');

const CONVERSATION_NAMESPACE = "conversation";

//Todo: Move to a cache service
const userSockets = {};

class ConversationSocket {
    constructor(io){
        this.socket = io.of('/'+CONVERSATION_NAMESPACE);
        //Authentication middleware
        this.socket.use(socketAuth);
    }
    listen(){
        //Connection
        this.socket.on('connection', socket => {
            const {user, error} = socket.handshake.query;
            if (error){
                socket.conn.close();
                return;
            }
            console.log("New conversation socket connection: ", user);
            this.addUserSocket(socket, user.id);
            //Track disconnect
            socket.on('disconnect', socket => {
                console.log("Socket DISCONNECTED: ", user);
                this.cleanDisconnectedUser(user.id);
            });
            //Add contact to a conversation
            socket.on('add-contact', async ({contactId, channel}) => {
                console.log('Add contact', contactId, ' to channel ', channel);
                const contactSocket = this.getSocketForUser(contactId);
                console.debug(`Sending 'join-conversation' to ${contactId}`);
                contactSocket.emit('join-conversation', {channel});
                trackEvent(AnalyticsEvents.ADD_CONTACT, {contactId, conversationId: channel}, user);
            });
            socket.on('leave-conversation', ({channel, isLastOne}) => {
                trackEvent(AnalyticsEvents.LEAVE_CONVERSATION, {conversationId: channel, isLastOne}, user);
            });
        });
    }
    addUserSocket(socket, userId){
        userSockets[userId] = socket;
    }
    removeUserSocket(userId){
        console.log("removing user", userId);
        delete userSockets[userId];
    }
    getSocketForUser(userId){
        return userSockets[userId];
    }
    cleanDisconnectedUser(user){
        //Remove the corresponding user socket
        this.removeUserSocket(user);
    }
}

module.exports = ConversationSocket;