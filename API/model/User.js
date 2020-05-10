const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 10
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    className: {
        type: String,
        required: true
    },
    cardNo: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'moderator']
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);