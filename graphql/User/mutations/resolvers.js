const User = require('../../../mongo/models/User');
const Counters = require('../../../mongo/models/Counters');
const { fork } = require('child_process');
const { Tasks } = require('../../../tasks/analytics');

module.exports.singUpUserResolver = async function (_, args) {
    const user = await new User({...args});
    try{
        //Use Numbers for user ids.
        user._id = await Counters.getNextSequence("userId");
        const savedUser = await user.save();
        return savedUser.jwt();
    }catch(error){
        console.log(error);
        throw(error);
    }
};
module.exports.loginUserResolver = async function (_, {email, password}) {
    try {
        //Check if email exists
        const user = await User.findOne({email});
        if (!user) throw(new Error('Email or password is wrong!'));
        //Check password
        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) throw(new Error('Email or password is wrong!'));
        //Success. Return an access token
        return await user.jwt();
    } catch(error) {
        console.error(error);
        throw(error);
    }
};

/** Super Admin **/
module.exports.forceIdentifyUsers =  function () {
    //Run the task on another process
    const process = fork('./tasks/analytics', { execArgv: [] });
    process.send({task: Tasks.FORCE_IDENTIFY_ALL_USERS});
    return 'OK';
};