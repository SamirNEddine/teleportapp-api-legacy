const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
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
    companyId: {
        type: Schema.Types.ObjectID,
        required: true
    },
    departmentId: {
        type: Schema.Types.ObjectID
    },
    siteId: {
        type: Schema.Types.ObjectID
    },
    teamId: {
        type: Schema.Types.ObjectID
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superAdmin'],
        default: 'user'
    }
}, {timestamp: true});

/** Data validation **/
const validation = data => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(24).required(),
        companyId: Joi.string().min(10).required(),
        jobTitle: Joi.string().min(2).optional(),
        profilePicture: Joi.string().min(10).optional(),
        departmentId: Joi.string().min(10).required(),
        siteId: Joi.string().min(10).required(),
        teamId: Joi.string().min(10).required()
    });
    return Joi.validate(data, schema);
};

UserSchema.pre('validate', function(next) {
    const { error } = validation(this._doc);
    if (error) throw(error.details[0].message);
    next();
});

/** Password hashing **/
UserSchema.pre('save', async  function(next) {
    if (this.isNew){
        //Check if existing
        const emailExist = await User.findOne({email: this.email});
        if (emailExist) throw (new Error("Email already exist!"));
        this.password = await argon2.hash(this.password, argon2.argon2id);
    }
    next();
});

const User = new mongoose.model('User', UserSchema);

/** JWT **/
User.prototype.jwt = function() {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            companyId: this.companyId
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRATION}
    )
};

User.prototype.verifyPassword = function(password) {
    return argon2.verify(this.password, password);
};

module.exports = User;