const Company = require('../../../mongo/models/Company');

module.exports.nestedDepartmentCompany = async function (department) {
    try{
        return await Company.findById(department.companyId);
    }catch(error){
        console.error(error);
        throw(error);
    }
};
