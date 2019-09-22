const Segment = require('analytics-node');
const analytics = process.env.SEGMENT_KEY ? new Segment(process.env.SEGMENT_KEY) : null;

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

module.exports.linkUserToGroup = function(user, groupId, groupType, groupProperties){
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

module.exports.trackEvent = function(user, eventName, eventProperties) {
    if(analytics){
        analytics.track({
            userId: user.id,
            event: eventName,
            properties: eventProperties
        });
    }
};