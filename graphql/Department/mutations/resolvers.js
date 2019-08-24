const Company = require('../../../mongo/models/Company');

module.exports.createDepartmentResolver = async function (_, {name, companyId}, {user}) {
    try{
        companyId = companyId ? companyId : user.companyId;
        const company = await Company.findById(companyId);
        company.departments.push({name});
        const savedCompany = await company.save();
        return savedCompany.departments.pop()
    }catch(error){
        console.error(error);
        throw(error);
    }
};