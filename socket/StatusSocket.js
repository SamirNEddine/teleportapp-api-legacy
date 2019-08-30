const { socketAuth } = require('../middleware/authentication');

const STATUS_NAMESPACE = "status";

//Todo: Move to a cache service
const availableUsers = {};

class StatusSocket {
    static statusForUser(user){
        if (availableUsers && availableUsers[String(user.companyId)] && availableUsers[String(user.companyId)].some(u => { return String(u.id) === String(user.id)})){
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
            const {user, error} = socket.handshake.query;
            if (error){
                socket.conn.close();
                return;
            }
            console.log("New status socket connection: ", user);
            this.addAvailableUser(user);
            socket.broadcast.emit('status-update', {user, status:"available"});
            //Track disconnect
            socket.on('disconnect', socket => {
                console.log("Socket DISCONNECTED: ", user);
                this.removeAvailableUser(user);
                this.socket.emit('status-update', {user, status:"unavailable"});
            })
        });
    }
    addAvailableUser(user) {
        if(!availableUsers[String(user.companyId)]) availableUsers[String(user.companyId)] = [];
        availableUsers[String(user.companyId)].push(user);
    }
    removeAvailableUser(user){
        availableUsers[String(user.companyId)] = availableUsers[String(user.companyId)].filter( u => {
            return String(u.id) !== String(user.id);
        });
    }
}

module.exports = StatusSocket;