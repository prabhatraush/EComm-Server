const mongoose = require('mongoose');


const AddressSchema = mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    street1: {
        type: String,
        required: true
    },
    street2: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    }
})

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'seller'],
        default: 'user'
    },
    address: AddressSchema,

}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);