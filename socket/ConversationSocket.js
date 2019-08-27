const { socketAuth } = require('../middleware/authentication');
const User = require('../mongo/models/User');

const CONVERSATION_NAMESPACE = "conversation";

//Todo: Move to a cache service
const userSockets = {};
const conversations = {};//{companyId:{channel:[users]}

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
                this.cleanDisconnectedUser(user);
            });
            //Start conversation event
            socket.on('start-conversation', async ({channel}) => {
                console.log('Starting conversation by: ', user);
                const fullUser = await User.findById(user.id).lean();
                this.addUserToConversation({...fullUser, id: fullUser._id, password: ''}, channel);
            });
            //Add contact to a conversation
            socket.on('add-contact', async ({contact, channel}) => {
                console.log('Add contact', contact, ' to channel ', channel);
                this.addUserToConversation(contact, channel);
                const contactSocket = this.getSocketForUser(contact);
                contactSocket.emit('join-conversation', {channel, contacts: this.getContactsForChannel(contact, channel)});
                socket.emit('contact-added', {contact, channel});
            });
            //Leave conversation
            socket.on('leave-conversation', ({channel}) => {
                console.log(user, 'left conversation', channel);
                this.removeUserFromConversation(user, channel);
            });
            socket.on('contact-left', ({channel, contact}) => {
                console.log(contact, 'left conversation', channel);
                this.removeUserFromConversation(contact, channel);
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
    removeUserFromConversation(user, channel){
        const usersInConversation = conversations[user.companyId][channel];
        conversations[user.companyId][channel] = usersInConversation.filter( u => {
            return (String(user.id) !== String(u.id));
        });
        if(!conversations[user.companyId][channel].length) delete conversations[user.companyId][channel];
    }
    addUserToConversation(user, channel){
        if (!conversations[user.companyId]) conversations[user.companyId]={};
        if (!conversations[user.companyId][channel]) conversations[user.companyId][channel] = [];
        conversations[user.companyId][channel].push(user);
    };
    getContactsForChannel(user, channel){
        //Return others except me
        const contacts = conversations[user.companyId][channel];
        return contacts.filter( contact => {
            return String(contact.id) !== String(user.id)
        });
    };
    cleanDisconnectedUser(user){
        //Remove the corresponding user socket
        this.removeUserSocket(user);
        //If the user is in a conversation. Another contact will declare him to remove.
    }
}

module.exports = ConversationSocket;