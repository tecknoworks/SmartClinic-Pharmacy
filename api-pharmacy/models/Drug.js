var mongoose = require('mongoose');
const Pharmacy = require('./Pharmacy');
var Float = require('mongoose-float').loadType(mongoose, 2);

const drugSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Float,
            required: true
        },
        pharmacys: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pharmacy"
            }
        ]
    }
);


const Drug = mongoose.model('Drug', drugSchema);
module.exports = Drug;