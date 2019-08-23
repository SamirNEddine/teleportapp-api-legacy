const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    firstName: {
        type: String,
        required: true,
        min: 2
    },
    lastName: {
        type: String,
        required: true,
        min: 2
    },
    email: {
        type: String,
        required: true,
        min: 6
    },
    password: {
        type: String,
        required: true,
        min: 24
    },
    jobTitle: {
        type: String
    },
    profilePicture: {
        type: String
    },
    company: {
        type: Schema.Types.ObjectID,
        required: true
    },
    department: {
        type: Schema.Types.ObjectID
    },
    site: {
        type: Schema.Types.ObjectID
    },
    team: {
        type: Schema.Types.ObjectID
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superAdmin']
    }
}, {timestamp: true});

module.exports = new mongoose.model('user', UserSchema);