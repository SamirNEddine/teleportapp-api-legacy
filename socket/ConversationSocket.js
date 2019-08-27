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
                const contactSocket = this.getSocketForUser(contact);
                const theUser = await User.findById(user.id);
                theUser.password = '';
                contactSocket.emit('join-conversation', {channel, contacts: [{...theUser._doc, id: theUser._id}]});
                socket.emit('contact-added', {contact, channel});
            });
        });
    }
    addUserSocket(socket, user){
        if(!userSockets[user.companyId]) userSockets[user.companyId] = {};
        userSockets[user.companyId][user.id] = socket;
    }
    removeUserSocket(user){
        console.log("removing user", user);
        delete userSockets[user.companyId][user.id];
    }
    getSocketForUser(user){
        return userSockets[user.companyId][user.id];
    }
}

module.exports = ConversationSocket;