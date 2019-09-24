const Segment = require('analytics-node');
const analytics = process.env.SEGMENT_KEY ? new Segment(process.env.SEGMENT_KEY) : null;

module.exports.AnalyticsEvents = {
    UPDATE_STATUS: 'UPDATE_STATUS'
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
        analytics.track({
            userId: user.id,
            event: eventName,
            properties: eventProperties
        });
    }
}
module.exports.trackEvent = trackEvent;

module.exports.trackEvents = function(events, user) {
    if(analytics){
        events.forEach( ({eventName, eventProperties}) => {
            trackEvent(eventName, eventProperties, user);
        });
    }
};