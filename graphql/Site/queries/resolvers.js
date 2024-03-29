const Company = require('../../../mongo/models/Company');

module.exports.siteResolver = async function (_, {id, companyId}, context) {
    try{
        companyId = companyId ? companyId : user.companyId;
        const company = await Company.findById(companyId);
        return company.sites.find(site => site.id === id );
    }catch(error){
        console.error(error);
        throw(error);
    }
};