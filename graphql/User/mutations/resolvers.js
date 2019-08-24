const User = require('../../../mongo/models/User');

module.exports.singUpUserResolver = async function (_, args) {
    const user = await new User({...args});
    try{
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
        return user.jwt();
    } catch(error){
        console.error(error);
        throw(error);
    }
};