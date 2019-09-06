const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getJWTForUser, hashPassword, verifyPassword } = require('../../utils/authentication');

const UserSchema = Schema({
    _id: {
      type: Number,
      required: true
    },
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
        password: Joi.string().min(8).required(),
        companyId: Joi.required()
    }).unknown();
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
        this.password = await hashPassword(this.password);
    }
    next();
});

/** Extend User model with helpers methods **/
const User = new mongoose.model('User', UserSchema);

/** JWT **/
User.prototype.jwt = async function() {
    return await getJWTForUser(this._id.toString(), this.email, this.companyId.toString());
};
User.prototype.verifyPassword = async function(password) {
    return await verifyPassword(password, this.password);
};

/** Export **/
module.exports = User;