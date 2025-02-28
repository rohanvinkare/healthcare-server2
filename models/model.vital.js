const mongoose = require('mongoose');

const vitalSignsSchema = new mongoose.Schema({
    heartRate: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        critical_low: { type: Number, required: true },
        critical_high: { type: Number, required: true },
        unit: { type: String, required: true }
    },
    respiratoryRate: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        critical_low: { type: Number, required: true },
        critical_high: { type: Number, required: true },
        unit: { type: String, required: true }
    },
    bodyTemperature: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        critical_low: { type: Number, required: true },
        critical_high: { type: Number, required: true },
        unit: { type: String, required: true }
    },
    oxygenSaturation: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        critical_low: { type: Number, required: true },
        critical_high: { type: Number, default: null },
        unit: { type: String, required: true }
    },
    bp_systolic: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        critical_low: { type: Number, required: true },
        critical_high: { type: Number, required: true },
        unit: { type: String, required: true }
    },
    bp_diastolic: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        critical_low: { type: Number, required: true },
        critical_high: { type: Number, required: true },
        unit: { type: String, required: true }
    }

});

const VitalSigns = mongoose.model('VitalSigns', vitalSignsSchema);
module.exports = VitalSigns;
