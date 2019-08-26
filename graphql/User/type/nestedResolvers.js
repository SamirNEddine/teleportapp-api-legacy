const Company = require('../../../mongo/models/Company');
const StatusSocket = require('../../../socket/StatusSocket');

module.exports.nestedUserCompanyResolver = async function (user) {
    try{
        return await Company.findById(user.companyId);
    }catch (error) {
        console.debug(error);
        throw(error);
    }
};
module.exports.nestedUserDepartmentResolver = async function (user) {
    try{
        const company = await Company.findById(user.companyId);
        return company.departments.find(dep => user.departmentId == dep.id);
    }catch (error) {
        console.debug(error);
        throw(error);
    }
};
module.exports.nestedUserSiteResolver = async function (user) {
    try{
        const company = await Company.findById(user.companyId);
        return company.sites.find(site => user.siteId == site.id);
    }catch (error) {
        console.debug(error);
        throw(error);
    }
};
module.exports.nestedUserTeamResolver = async function (user) {
    try{
        const company = await Company.findById(user.companyId);
        return company.teams.find(team => user.teamId == team.id);
    }catch (error) {
        console.debug(error);
        throw(error);
    }
};
module.exports.nestedStatusResolver = function (user) {
    return StatusSocket.statusForUser(user);
};
