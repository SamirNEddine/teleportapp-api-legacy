const { connectToDb } = require('../utils/mongoose');
const User = require('../mongo/models/User');
const { identifyUser, linkUserToGroup } = require('../utils/analytics');
const { setupSentry } = require('../utils/sentry');

setupSentry();

const Tasks = {
    FORCE_IDENTIFY_ALL_USERS: 'FORCE_IDENTIFY_ALL_USERES'
};
module.exports.Tasks = Tasks;

const forceIdentifyAllUsers = async function() {
    connectToDb();
    const users = await User.find({});
    users.forEach( user => {
        user.id = String(user._id);
        identifyUser(user);
        linkUserToGroup(user, String(user.companyId), 'companyId');
        linkUserToGroup(user, String(user.departmentId), 'departmentId');
        linkUserToGroup(user, String(user.teamId), 'teamId');
        linkUserToGroup(user, String(user.siteId), 'siteId');
    });
};

process.on('message', async (message) => {
    try{
        const {task} = message;
        console.debug(`Running ${task} task`);
        switch (task) {
            case Tasks.FORCE_IDENTIFY_ALL_USERS:
                await forceIdentifyAllUsers();
                break;
            default:
                break;
        }
    }catch(error){
        console.error(error);
    }
});