const mongoose = require('mongoose');

const iotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    key: {
        type: String,
        required: true,
        max: 255,
        min: 10
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Iot', iotSchema);