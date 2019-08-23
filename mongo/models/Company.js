const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
 * For now put site, departments and teams inside the company collection as sub documents
 */

/** Site Schema **/
const AddressSchema = Schema({
    street: {
        type: String,
        required: true,
        min: 6
    },
    zipCode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true,
        min: 2
    },
    Country: {
        type: String,
        required: true,
        min: 3
    }
});

const SiteSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: AddressSchema,
        required: true
    },
    isHeadquarter: {
        type: Boolean,
        default: false
    }
}, {timestamp: true});

/** Department Schema **/
const DepartmentSchema = Schema({
    name: {
        type: String,
        required: true,
        min: 2
    }
}, {timestamp: true});

/** Team Schema **/
const TeamSchema = Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamp: true});

/** Company Schema **/
const CompanySchema = Schema({
    name:{
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    website: {
        type: String
    },
    sites: [{
        type: SiteSchema
    }],
    departments: [{
        type: DepartmentSchema
    }],
    teams: [{
        type: TeamSchema
    }]
}, {timestamp: true});

module.exports = new mongoose.model('company', CompanySchema);