const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const patientSchema = new mongoose.Schema({
    patient_id: {
        type: String,
        unique: true,
        // default: uuidv4
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    emergency_contact: {
        name: { type: String, required: true },
        relationship: { type: String, required: true },
        contact_number: { type: String, required: true }
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postal_code: { type: String, required: true },
        country: { type: String, required: true }
    },
    blood_type: {
        type: String,
        required: true
    },
    patient_type: {
        type: String,
        enum: [
            'child',
            'young adult',
            'athlete',
            'pregnant',
            'infant',
            'adolescent',
            'adult',
            'elderly',
            'disabled',
            'chronically ill',
            'terminally ill',
            'neonate',
            'toddler',
            'preschooler',
        ],
        required: true
    },
    lifestyle: {
        diet: {
            type: String,
            enum: [
                'vegetarian',
                'vegan',
                'omnivore',
                'gluten-free',
                'dairy-free',
                'other'
            ]
        },
        physical_activity: {
            type: String,
            enum: [
                'sedentary',
                'lightly active',
                'moderately active',
                'very active',
                'extra active'
            ]
        },
        smoking_status: {
            type: String,
            enum: [
                'non-smoker',
                'former smoker',
                'current smoker'
            ]
        },
        alcohol_consumption: {
            type: String,
            enum: [
                'non-drinker',
                'light drinker',
                'moderate drinker',
                'heavy drinker'
            ]
        },
        stress_level: {
            type: String,
            enum: [
                'low',
                'moderate',
                'high'
            ]
        },
        sleep_quality: {
            type: String,
            enum: [
                'poor',
                'fair',
                'good',
                'excellent'
            ]
        }
    },

    height: {
        type: Number, // cm
        required: true
    },
    weight: {
        type: Number, // kg
        required: true
    },
    allergies: {
        type: [String],
        default: []
    },
    medical_history: {
        type: [String],
        default: []
    },
    current_medications: [{
        name: { type: String },
        dosage: { type: String },
        frequency: { type: String },
        start_date: { type: Date }
    }],
    insurance_information: {
        provider: { type: String },
        policy_number: { type: String },
        expiration_date: { type: Date }
    },
    admission_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    assigned_doctor_id: {
        type: [String], // Changed to an array of strings
        required: true // Reference to multiple doctors
    },
    assigned_nurse_id: {
        type: [String], // Changed to an array of strings
        required: true // Reference to multiple nurses
    }
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
