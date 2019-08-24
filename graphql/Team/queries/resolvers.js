const Company = require('../../../mongo/models/Company');

module.exports.teamResolver = async function (_, {id, companyId}, {user}) {
    try{
        companyId = companyId ? companyId : user.companyId;
        const company = await Company.findById(companyId);
        return company.teams.find(team => team.id === id );
    }catch(error){
        console.error(error);
        throw(error);
    }
};