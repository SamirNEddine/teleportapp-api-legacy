const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        id: Schema.Types.ObjectID,
        isHeadquarter: {type: Boolean, default: false}
    }],
    departments: [{
        id: Schema.Types.ObjectID,
    }]
}, {timestamp: true});

module.exports = new mongoose.model('company', CompanySchema);