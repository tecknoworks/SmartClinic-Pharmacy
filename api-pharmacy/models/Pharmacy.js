var mongoose = require('mongoose');

const Drug = require('./Drug');

const pharmacySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        drugs: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drug"
            }
        ]
    }
);

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
module.exports = Pharmacy;