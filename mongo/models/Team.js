const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = Schema({
    name: {
        type: String,
        required: true
    },
    company:{
        type: Schema.Types.ObjectID,
        required: true
    }
}, {timestamp: true});

module.exports = new mongoose.model('team', TeamSchema);