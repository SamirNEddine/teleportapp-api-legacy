const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = Schema({
    name: {
        type: String,
        required: true,
        min: 2
    }
}, {timestamp: true});

export default new mongoose.model('department', DepartmentSchema);