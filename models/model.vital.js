const mongoose = require('mongoose');

const vitalSignsSchema = new mongoose.Schema({
    patient_id: { type: String, required: true }, // Ensure patient_id is stored as a string
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
    bloodPressure: {
        systolic: {
            min: { type: Number, required: true },
            max: { type: Number, required: true },
            critical_low: { type: Number, required: true },
            critical_high: { type: Number, required: true },
            unit: { type: String, required: true }
        },
        diastolic: {
            min: { type: Number, required: true },
            max: { type: Number, required: true },
            critical_low: { type: Number, required: true },
            critical_high: { type: Number, required: true },
            unit: { type: String, required: true }
        }
    },
    painLevel: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        critical_low: { type: Number, default: null },
        critical_high: { type: Number, required: true },
        unit: { type: String, required: true }
    },
    glucose: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        critical_low: { type: Number, required: true },
        critical_high: { type: Number, required: true },
        unit: { type: String, required: true }
    }
});

const VitalSigns = mongoose.model('VitalSigns', vitalSignsSchema);
module.exports = VitalSigns;
