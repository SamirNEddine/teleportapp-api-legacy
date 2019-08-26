const { socketAuth } = require('../middleware/authentication');

const STATUS_NAMESPACE = "status";

class StatusSocket {
    constructor(io){
        this.socket = io.of('/'+STATUS_NAMESPACE);
        //Authentication middleware
        this.socket.use(socketAuth);
    }

    listen(){
        this.socket.on('connection', function (socket) {
            console.log("Status Socket Connected");
        })
    }
}

module.exports = StatusSocket;