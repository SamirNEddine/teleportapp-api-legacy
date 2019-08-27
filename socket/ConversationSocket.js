const { socketAuth } = require('../middleware/authentication');
const User = require('../mongo/models/User');

const CONVERSATION_NAMESPACE = "conversation";

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
            const {user} = socket.handshake.query;
            console.log("New conversation socket connection: ", user);
            this.addUserSocket(socket, user);
            //Track disconnect
            socket.on('disconnect', socket => {
                console.log("Socket DISCONNECTED: ", user);
                this.removeUserSocket(user);
                this.socket.emit('user-left', user);
            });
            //Add contact to a conversation
            socket.on('add-contact', async ({contact, channel}) => {
                console.log('Add contact', contact, ' to channel ', channel);
                const contactSocket = this.getSocketForContact(contact);
                const theUser = await User.findById(user.userId);
                theUser.password = '';
                contactSocket.emit('join-conversation', {channel, contacts: [theUser]});
                socket.emit('contact-added', {contact, channel});
            });
        });
    }
    addUserSocket(socket, user){
        if(!userSockets[user.companyId]) userSockets[user.companyId] = {};
        userSockets[user.companyId][user.userId] = socket;
    }
    removeUserSocket(user){
        console.log("removing user", user);
        delete userSockets[user.companyId][user.userId];
    }
    getSocketForUser(user){
        return userSockets[user.companyId][user.userId];
    }
    getSocketForContact(contact){
        return userSockets[contact.company.id][contact.id];
    }
}

module.exports = ConversationSocket;