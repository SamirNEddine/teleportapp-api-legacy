const { socketAuth } = require('../middleware/authentication');

const STATUS_NAMESPACE = "status";

//Todo: Move to a cache service
const availableUsers = {};

class StatusSocket {
    static statusForUser(user){
        if (availableUsers && availableUsers[user.companyId] && availableUsers[user.companyId].any(u => { return u.userId === String(user.id)})){
            return 'available';
        }else{
            return 'unavailable';
        }
    }

    constructor(io) {
        this.socket = io.of('/'+STATUS_NAMESPACE);
        //Authentication middleware
        this.socket.use(socketAuth);
    }
    listen() {
        this.socket.on('connection', socket => {
            const {user} = socket.handshake.query;
            console.log("New status socket connection: ", user);
            this.addAvailableUser(user);
            socket.broadcast.emit('user-available', user);
            //Track disconnect
            socket.on('disconnect', socket => {
                console.log("Socket DISCONNECTED: ", user);
                this.removeAvailableUser(user);
                this.socket.emit('user-unavailable', user);
            })
        });
    }
    addAvailableUser(user) {
        if(!availableUsers[user.companyId]) availableUsers[user.companyId] = [];
        availableUsers[user.companyId].push(user);
    }
    removeAvailableUser(user){
        availableUsers[user.companyId] = availableUsers[user.companyId].filter( u => {
            return u.userId !== user.userId;
        });
    }
}

module.exports = StatusSocket;