const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Personel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Personel'
    },
    listName: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('List', listSchema);