const mongoose = require('mongoose');

const passwordRecovery = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    used: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('PasswordRecovery', passwordRecovery);