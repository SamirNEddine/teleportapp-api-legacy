const { socketAuth } = require('../middleware/authentication');
const { redisGetAsync, redisSetAsync } = require('../utils/redis');
const { trackEvent, trackEvents, AnalyticsEvents } = require('../utils/analytics');

const STATUS_NAMESPACE = "status";
const CACHE_KEY = 'onlineUsers';

async function getOnlineUsersCache(user){
    const onlineUsers = await redisGetAsync(`${CACHE_KEY}_${user.companyId}`);
    return onlineUsers ? JSON.parse(onlineUsers) : {};
}
function updateOnlineUsersCache(onlineUsers, user){
    redisSetAsync(`${CACHE_KEY}_${user.companyId}`, JSON.stringify(onlineUsers));
}

class StatusSocket {
    static async statusForUser(user){
        const onlineUsers = await getOnlineUsersCache(user);
        if (onlineUsers[String(user.id)]){
            return onlineUsers[String(user.id)];
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
                console.error('Error with STATUS socket: ', error);
                return;
            }
            console.log("New status socket connection: ", user);
            this.addOnlineUser(user);
            socket.broadcast.emit('status-update', {user, status:"available"});
            //Status update
            socket.on('update-status', ({status}) => {
                console.debug(`${user.id} updated status to ${status}`);
                this.updateUserStatus(user, status);
                socket.broadcast.emit('status-update', {user, status});
            });
            //Track disconnect
            socket.on('disconnect', socket => {
                console.log("Socket DISCONNECTED: ", user);
                this.removeOnlineUser(user);
                this.socket.emit('status-update', {user, status:"unavailable"});
            });
            socket.on('analytics', (events) => {
                trackEvents(events, user);
            });
        });
    }


    async addOnlineUser(user) {
        try{
            const onlineUsers = await getOnlineUsersCache(user);
            onlineUsers[String(user.id)] = 'available';
            updateOnlineUsersCache(onlineUsers, user);
            trackEvent(AnalyticsEvents.USER_CONNECTED, {}, user);
        }catch(e){
            console.debug('Redis Error:', e);
        }
    }
    async removeOnlineUser(user){
        try{
            const onlineUsers = await getOnlineUsersCache(user);
            delete onlineUsers[String(user.id)];
            updateOnlineUsersCache(onlineUsers, user);
            trackEvent(AnalyticsEvents.USER_DISCONNECTED, {}, user);
        }catch (e) {
            console.debug('Redis Error:', e);
        }
    }
    async updateUserStatus(user, status){
        try{
            const onlineUsers = await getOnlineUsersCache(user);
            const currentStatus = onlineUsers[String(user.id)];
            if(currentStatus !== status){
                onlineUsers[String(user.id)] = status;
                updateOnlineUsersCache(onlineUsers, user);
            }
        }catch (e) {
            console.debug('Redis Error:', e);
        }
    }
}

module.exports = StatusSocket;