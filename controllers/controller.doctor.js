const { validationResult } = require("express-validator");
const Doctor = require("../models/model.doctor");
const Patient = require("../models/model.patient");

// ------------------------------ ADD DOCTOR ------------------------------
const addDoctor = async (req, res) => {
    try {
        // Validating the request with express-validator
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation errors",
                error: valErrors.array(),
            });
        }

        // Extract doctor details from request body
        const {
            first_name,
            last_name,
            license_number,
            specialization,
            contact_number,
            email,
            department,
            schedule,
            case_ids,
        } = req.body;

        // Check if doctor with given license number already exists
        const existingDoctor = await Doctor.findOne({ license_number });
        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                msg: "Doctor with this license number already exists",
            });
        }

        // Create a new doctor
        const newDoctor = new Doctor({
            first_name,
            last_name,
            license_number,
            specialization,
            contact_number,
            email,
            department,
            schedule,
            case_ids,
        });

        // Save the doctor to the database
        const savedDoctor = await newDoctor.save();

        // Return success response
        return res.status(201).json({
            success: true,
            msg: "Doctor added successfully",
            doctor: savedDoctor,
        });
    } catch (error) {
        console.error("Error adding doctor:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while adding the doctor",
        });
    }
};

// ------------------------------ DELETE DOCTOR ------------------------------
const deleteDoctor = async (req, res) => {
    try {
        // Validating the request with express-validator
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation errors",
                error: valErrors.array(),
            });
        }

        // Extract doctor_id from request body
        const { doctor_id } = req.body;

        // Check if the doctor exists
        const existingDoctor = await Doctor.findOne({ doctor_id });
        if (!existingDoctor) {
            return res.status(400).json({
                success: false,
                msg: "Doctor with this ID does not exist",
            });
        }

        // Check if the doctor has any assigned patients
        if (existingDoctor.case_ids.length > 0) {
            return res.status(400).json({
                success: false,
                msg: "Doctor cannot be deleted as they have assigned patients. Reassign or discharge them first.",
            });
        }

        // Delete the doctor from the database
        await Doctor.deleteOne({ doctor_id });

        return res.status(200).json({
            success: true,
            msg: "Doctor deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while deleting the doctor",
        });
    }
};

//------------------------------------ Update Doctor -----------------------------------
const updateDoctor = async (req, res) => {
    try {
        // Validating the request with express-validator
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation errors",
                error: valErrors.array(),
            });
        }

        // Extract doctor_id and updated fields from request body
        const { doctor_id, ...updateFields } = req.body;

        // Check if doctor with given ID exists
        const existingDoctor = await Doctor.findOne({ doctor_id });
        if (!existingDoctor) {
            return res.status(400).json({
                success: false,
                msg: "Doctor with this ID does not exist",
            });
        }

        // Update only the fields that are passed in request body
        const updatedDoctor = await Doctor.findOneAndUpdate(
            { doctor_id },
            { $set: updateFields },
            { new: true }
        );

        // Return success response
        return res.status(200).json({
            success: true,
            msg: "Doctor updated successfully",
            doctor: updatedDoctor,
        });
    } catch (error) {
        console.error("Error updating doctor:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while updating the doctor",
        });
    }
};

/**
 * Controller to add a patient (case) to a doctor
 */
const addCaseToDoctor = async (req, res) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation errors",
                error: valErrors.array(),
            });
        }

        const { doctor_id, case_id } = req.body;

        // Check if the patient exists
        const existingPatient = await Patient.findOne({ patient_id: case_id });
        if (!existingPatient) {
            return res.status(400).json({
                success: false,
                msg: `Patient with ID ${case_id} does not exist`,
            });
        }

        // Check if the doctor exists
        const existingDoctor = await Doctor.findOne({ doctor_id });
        if (!existingDoctor) {
            return res.status(400).json({
                success: false,
                msg: `Doctor with ID ${doctor_id} does not exist`,
            });
        }

        // Check if the case (patient) is already assigned to the doctor
        if (existingDoctor.case_ids.includes(case_id)) {
            return res.status(400).json({
                success: false,
                msg: "Patient is already assigned to this doctor",
            });
        }

        // Add patient_id to the doctor's case list
        existingDoctor.case_ids.push(case_id);
        const updatedDoctor = await existingDoctor.save();

        return res.status(200).json({
            success: true,
            msg: "Patient added to doctor successfully",
            doctor: updatedDoctor,
        });
    } catch (error) {
        console.error("Error adding patient to doctor:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while adding patient to doctor",
        });
    }
};

/**
 * Controller to remove a patient (case) from a doctor
 */
const removeCaseFromDoctor = async (req, res) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation errors",
                error: valErrors.array(),
            });
        }

        const { doctor_id, case_id } = req.body;

        // Check if the patient exists
        const existingPatient = await Patient.findOne({ patient_id: case_id });
        if (!existingPatient) {
            return res.status(400).json({
                success: false,
                msg: `Patient with ID ${case_id} does not exist`,
            });
        }

        // Check if the doctor exists
        const existingDoctor = await Doctor.findOne({ doctor_id });
        if (!existingDoctor) {
            return res.status(400).json({
                success: false,
                msg: `Doctor with ID ${doctor_id} does not exist`,
            });
        }

        // Check if the case (patient) is assigned to the doctor
        if (!existingDoctor.case_ids.includes(case_id)) {
            return res.status(400).json({
                success: false,
                msg: "Patient is not assigned to this doctor",
            });
        }

        // Remove patient_id from the doctor's case list
        existingDoctor.case_ids = existingDoctor.case_ids.filter(
            (id) => id !== case_id
        );
        const updatedDoctor = await existingDoctor.save();

        return res.status(200).json({
            success: true,
            msg: "Patient removed from doctor successfully",
            doctor: updatedDoctor,
        });
    } catch (error) {
        console.error("Error removing patient from doctor:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while removing patient from doctor",
        });
    }
};

//--------------------- Get Doctor by doctor_id

const getDoctorById = async (req, res) => {
    try {
        // Validate request
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation errors",
                error: valErrors.array(),
            });
        }

        // Extract doctor_id from request params
        const { doctor_id } = req.params;

        // Find the doctor by doctor_id
        const doctor = await Doctor.findOne({ doctor_id });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                msg: "Doctor not found",
            });
        }

        // Return doctor details
        return res.status(200).json({
            success: true,
            msg: "Doctor retrieved successfully",
            doctor,
        });
    } catch (error) {
        console.error("Error fetching doctor:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while fetching the doctor",
        });
    }
};


module.exports = {
    addDoctor,
    deleteDoctor,
    updateDoctor,
    addCaseToDoctor,
    removeCaseFromDoctor,
    getDoctorById

};
