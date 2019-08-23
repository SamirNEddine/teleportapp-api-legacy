const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = Schema({
    name: {
        type: String,
        required: true,
        min: 2
    }
}, {timestamp: true});

module.exports = new mongoose.model('department', DepartmentSchema);