const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
}, {timestamp: true});

module.exports = new mongoose.model('site', SiteSchema);