const User = require('../../../mongo/models/User');

module.exports.userResolver = async function (_, {id}, {user}) {
    try{
        id = id ? id : user.userId;
        const theUser = await User.findById(id);
        return {...theUser._doc, password: ''}
    }catch(error){
        console.error(error);
        throw(error);
    }
};