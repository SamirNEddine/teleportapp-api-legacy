const Company = require('../../../mongo/models/Company');

module.exports.companyResolver = async function (_, {id}, context) {
    try{
        return await Company.findById(id);
    }catch(error){
        console.error(error);
        throw(error);
    }
};