const Company = require('../../../mongo/models/Company');

module.exports.createCompanyResolver = async function (_, {name, website, logo}) {
    const company = new Company({name, website, logo});
    try{
        return await company.save();
    }catch(error){
        console.error(error);
        throw(error);
    }
};