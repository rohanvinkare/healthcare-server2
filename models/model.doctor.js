const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const doctorSchema = new mongoose.Schema({
    doctor_id: {
        type: String,
        unique: true,
        default: uuidv4
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    license_number: {
        type: String,
        required: true,
        unique: true
    },
    specialization: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    schedule: [{
        day: {
            type: String,
            required: true
        },
        start_time: {
            type: String,
            required: true
        },
        end_time: {
            type: String,
            required: true
        }
    }],
    case_ids: {
        type: [String],  // Array of case IDs
        default: []       // Initially empty
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
