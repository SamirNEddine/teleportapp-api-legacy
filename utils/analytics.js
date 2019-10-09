const Segment = require('analytics-node');
const analytics = process.env.SEGMENT_KEY ? new Segment(process.env.SEGMENT_KEY) : null;

module.exports.AnalyticsEvents = {
    USER_CONNECTED: 'USER_CONNECTED',
    USER_DISCONNECTED: 'USER_DISCONNECTED'
};

module.exports.identifyUser = function(user){
    if(analytics){
        analytics.identify({
            userId: user.id,
            traits: {
                companyId: user.companyId,
                departmentId: user.departmentId,
                teamId: user.teamId,
                siteId: user.siteId,
            }
        });
    }
};

module.exports.linkUserToGroup = function(user, groupId, groupType, groupProperties={}){
    if (analytics){
        analytics.group({
            userId: user.id,
            groupId,
            traits: {
                groupType,// Required for amplitude integration
                groupValue: groupId,// Require for amplitude integration
                ...groupProperties
            }
        })
    }
};

function trackEvent(eventName, eventProperties, user) {
    if(analytics){
        console.debug(`Tacking event ${eventName} with properties`, eventProperties);
        analytics.track({
            userId: user.id,
            event: eventName,
            properties: eventProperties
        });
    }
}
module.exports.trackEvent = trackEvent;

module.exports.trackEvents = function(events, user) {
    //Todo: Check if this is necessary.
    return new Promise(function (resolve, reject) {
        try{
            if(analytics){
                for(let i=0;i<events.length;i++){
                    const {eventName, eventProperties} = events[i];
                    setTimeout(function () {
                        trackEvent(eventName, eventProperties, user);
                    }, 1);
                }
                resolve();
            }
        }catch(error){
            reject(error);
        }

    });
};