const Company = require('../../../mongo/models/Company');

module.exports.companyResolver = async function (_, {companyId}, {user}) {
    try{
        companyId = companyId ? companyId : user.companyId;
        return await Company.findById(companyId);
    }catch(error){
        console.error(error);
        throw(error);
    }
};