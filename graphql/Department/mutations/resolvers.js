const Department = require('../../../mongo/models/Department');

module.exports.createDepartmentResolver = async function (_, {name, companyId}, context) {
    const department = new Department({name, companyId});
    try{
        return await department.save();
    }catch(error){
        console.error(error);
        throw(error);
    }
};