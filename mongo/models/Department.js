const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = Schema({
    name: {
        type: String,
        required: true,
        min: 2
    },
    companyId:{
        type: Schema.Types.ObjectId
    }
}, {timestamp: true});

module.exports = new mongoose.model('department', DepartmentSchema);