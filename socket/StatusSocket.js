const { socketAuth } = require('../middleware/authentication');

const STATUS_NAMESPACE = "status";

//Todo: Move to a cache service
const onlineUsers = {};// {companyId:{userId:'available|busy'}

class StatusSocket {
    static statusForUser(user){
        if (onlineUsers[String(user.companyId)] && onlineUsers[String(user.companyId)][String(user.id)]){
            return onlineUsers[String(user.companyId)][String(user.id)];
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
            this.addOnlineUser(user);
            socket.broadcast.emit('status-update', {user, status:"available"});
            //Track disconnect
            socket.on('disconnect', socket => {
                console.log("Socket DISCONNECTED: ", user);
                this.removeOnlineUser(user);
                this.socket.emit('status-update', {user, status:"unavailable"});
            })
        });
    }
    addOnlineUser(user) {
        if(!onlineUsers[String(user.companyId)]) onlineUsers[String(user.companyId)] = {};
        onlineUsers[String(user.companyId)][String(user.id)] = 'available';
    }
    removeOnlineUser(user){
        delete onlineUsers[String(user.companyId)][String(user.id)];
    }
}

module.exports = StatusSocket;