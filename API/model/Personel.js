const mongoose = require('mongoose');

const personelSchema = new mongoose.Schema({
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
    no: {
        type: String,
        required: true
    },
    cardNo: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Personel', personelSchema);