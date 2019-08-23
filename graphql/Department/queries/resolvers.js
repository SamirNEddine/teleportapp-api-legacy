const Company = require('../../../mongo/models/Company');

module.exports.departmentResolver = async function (_, {id, companyId}, context) {
    try{
        const company = await Company.findById(companyId);
        return company.departments.find(dep => dep.id === id );
    }catch(error){
        console.error(error);
        throw(error);
    }
};