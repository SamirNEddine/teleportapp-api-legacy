const User = require('../../../mongo/models/User');

module.exports.userResolver = async function (_, {id}, context) {
    try{
        const user = await User.findById(id);
        return {...user._doc, password: ''}
    }catch(error){
        console.error(error);
        throw(error);
    }
};