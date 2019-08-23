const Site = require('../../../mongo/models/Site');
const Department = require('../../../mongo/models/Department');

module.exports.nestedCompanySites = async function (company) {

};

module.exports.nestedCompanyDepartments = async function nestedCompanyDepartments(company) {
    try{
        return await Department.findById(company.departments);
    }catch(error) {
        console.error(error);
        throw(error);
    }
};