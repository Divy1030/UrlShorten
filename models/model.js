const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    short: {
        type: String,
        required: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;