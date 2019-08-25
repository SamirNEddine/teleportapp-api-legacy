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
module.exports.usersResolver = async function (_, {companyId}, {user}) {
    try{
        companyId = companyId ? companyId : user.companyId;
        let users = await User.find({companyId});
        //Remove me
        users = users.filter(u => {
            return u.id !== user.userId;
        });
        return users.map( u => {
            u.password = '';
            return u;
        });
    }catch(error){
        console.error(error);
        throw(error);
    }
};