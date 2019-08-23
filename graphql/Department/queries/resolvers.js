const Department = require('../../../mongo/models/Department');

module.exports.departmentResolver = async function (_, {id}, context) {
    try{
        return await Department.findById(id);
    }catch(error){
        console.error(error);
        throw(error);
    }
};