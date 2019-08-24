const Company = require('../../../mongo/models/Company');

module.exports.createTeamResolver = async function (_, {name, companyId}, {user}) {
    try{
        companyId = companyId ? companyId : user.companyId;
        const company = await Company.findById(companyId);
        company.teams.push({name});
        const savedCompany = await company.save();
        return savedCompany.teams.pop()
    }catch(error){
        console.error(error);
        throw(error);
    }
};