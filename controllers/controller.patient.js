const { validationResult } = require("express-validator");
const Patient = require("../models/model.patient");
const Doctor = require("../models/model.doctor");
const Nurse = require("../models/model.nurse");

/**
 * Controller to add a new patient
 */
const addPatient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            msg: "Validation errors",
            errors: errors.array(),
        });
    }

    try {
        const {
            first_name,
            last_name,
            date_of_birth,
            gender,
            contact_number,
            emergency_contact,
            address,
            blood_type,
            patient_type,
            lifestyle,
            height,
            weight,
            allergies,
            medical_history,
            current_medications,
            insurance_information,
            assigned_doctor_id = [], // Default to empty array
            assigned_nurse_id = [],  // Default to empty array
        } = req.body;

        // Check if phone number already exists
        const existingPatient = await Patient.findOne({ contact_number });
        if (existingPatient) {
            return res.status(400).json({
                success: false,
                msg: `A patient with phone number ${contact_number} already exists`,
            });
        }

        // Ensure assigned_doctor_id and assigned_nurse_id are arrays
        if (!Array.isArray(assigned_doctor_id) || !Array.isArray(assigned_nurse_id)) {
            return res.status(400).json({
                success: false,
                msg: "Assigned doctor IDs and nurse IDs must be arrays",
            });
        }

        // Validate if doctors exist
        const doctors = await Doctor.find({ doctor_id: { $in: assigned_doctor_id } });
        if (doctors.length !== assigned_doctor_id.length) {
            return res.status(400).json({
                success: false,
                msg: "One or more assigned doctor IDs are invalid",
            });
        }

        // Validate if nurses exist
        const nurses = await Nurse.find({ nurse_id: { $in: assigned_nurse_id } });
        if (nurses.length !== assigned_nurse_id.length) {
            return res.status(400).json({
                success: false,
                msg: "One or more assigned nurse IDs are invalid",
            });
        }

        // Create new patient
        const newPatient = new Patient({
            first_name,
            last_name,
            date_of_birth,
            gender,
            contact_number,
            emergency_contact,
            address,
            blood_type,
            patient_type,
            lifestyle,
            height,
            weight,
            allergies,
            medical_history,
            current_medications,
            insurance_information,
            assigned_doctor_id,
            assigned_nurse_id,
        });

        await newPatient.save();

        // Add patient_id to each assigned doctor's and nurse's case list
        await Doctor.updateMany(
            { doctor_id: { $in: assigned_doctor_id } },
            { $push: { case_ids: newPatient.patient_id } }
        );

        await Nurse.updateMany(
            { nurse_id: { $in: assigned_nurse_id } },
            { $push: { case_ids: newPatient.patient_id } }
        );

        return res.status(201).json({
            success: true,
            msg: "Patient added successfully",
            patient: newPatient,
        });
    } catch (error) {
        console.error("Error adding patient:", error);
        return res.status(500).json({
            success: false,
            msg: "Server error",
            error: error.message,
        });
    }
};


//-------------------------  Delete Patient -------------------------
const deletePatient = async (req, res) => {
    try {
        const { patient_id } = req.params;

        if (!patient_id) {
            return res.status(400).json({
                success: false,
                msg: "Patient ID is required",
            });
        }

        // Find the patient first
        const patient = await Patient.findOne({ patient_id });

        if (!patient) {
            return res.status(404).json({
                success: false,
                msg: "Patient not found",
            });
        }

        // Extract assigned doctors and nurses
        const { assigned_doctor_id, assigned_nurse_id } = patient;

        // Remove patient from assigned doctors' case lists
        if (assigned_doctor_id.length > 0) {
            await Doctor.updateMany(
                { doctor_id: { $in: assigned_doctor_id } },
                { $pull: { case_ids: patient_id } }
            );
        }

        // Remove patient from assigned nurses' case lists
        if (assigned_nurse_id.length > 0) {
            await Nurse.updateMany(
                { nurse_id: { $in: assigned_nurse_id } },
                { $pull: { case_ids: patient_id } }
            );
        }

        // Delete the patient
        await Patient.deleteOne({ patient_id });

        return res.status(200).json({
            success: true,
            msg: "Patient deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting patient:", error);
        return res.status(500).json({
            success: false,
            msg: "Server error",
            error: error.message,
        });
    }
};



module.exports = {
    addPatient,
    deletePatient
};
