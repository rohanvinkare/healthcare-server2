const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const nurseSchema = new mongoose.Schema({
    nurse_id: {
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
    shift_information: {
        shift_type: {
            type: String,
            required: true,
            enum: ['morning', 'evening', 'night']
        },
        start_time: {
            type: String,
            required: true
        },
        end_time: {
            type: String,
            required: true
        }
    },
    case_ids: {
        type: [String],  // Array of case IDs
        default: []       // Initially empty
    }
});

const Nurse = mongoose.model('Nurse', nurseSchema);
module.exports = Nurse;
