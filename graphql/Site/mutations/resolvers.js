const Company = require('../../../mongo/models/Company');

module.exports.createSiteResolver = async function (_, {name, streetAddress, zipCode, city, country, isHeadquarter, companyId}, {user}) {
    try{
        companyId = companyId ? companyId : user.companyId;
        const company = await Company.findById(companyId);
        isHeadquarter = isHeadquarter ? isHeadquarter : false;
        company.sites.push({name, isHeadquarter, address: {streetAddress, zipCode, city, country}});
        const savedCompany = await company.save();
        return savedCompany.sites.pop()
    }catch(error){
        console.error(error);
        throw(error);
    }
};