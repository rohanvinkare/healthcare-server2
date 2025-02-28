const { validationResult } = require("express-validator");
const Nurse = require("../models/model.nurse");
const Patient = require("../models/model.patient");

// ------------------------------ ADD NURSE ------------------------------


const addNurse = async (req, res) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res
                .status(400)
                .json({
                    success: false,
                    msg: "Validation errors",
                    error: valErrors.array(),
                });
        }

        const {
            first_name,
            last_name,
            license_number,
            contact_number,
            email,
            department,
            shift_information,
            // case_ids,
        } = req.body;

        const existingNurse = await Nurse.findOne({ license_number });
        if (existingNurse) {
            return res
                .status(400)
                .json({
                    success: false,
                    msg: "Nurse with this license number already exists",
                });
        }

        const newNurse = new Nurse({
            first_name,
            last_name,
            license_number,
            contact_number,
            email,
            department,
            shift_information,
            // case_ids,
        });
        const savedNurse = await newNurse.save();

        return res
            .status(201)
            .json({
                success: true,
                msg: "Nurse added successfully",
                nurse: savedNurse,
            });
    } catch (error) {
        console.error("Error adding nurse:", error);
        return res
            .status(500)
            .json({
                success: false,
                msg: error.message || "An error occurred while adding the nurse",
            });
    }
};

// ------------------------------ DELETE NURSE ------------------------------
const deleteNurse = async (req, res) => {
    try {
        // Validate the request
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation errors",
                error: valErrors.array(),
            });
        }

        // Extract nurse_id from request body
        const { nurse_id } = req.body;

        // Check if the nurse exists
        const existingNurse = await Nurse.findOne({ nurse_id });
        if (!existingNurse) {
            return res.status(400).json({
                success: false,
                msg: "Nurse with this ID does not exist",
            });
        }

        // Check if the nurse has any assigned patients (case IDs)
        if (existingNurse.case_ids.length > 0) {
            return res.status(400).json({
                success: false,
                msg: "Nurse cannot be deleted as they have assigned patients. Reassign or discharge them first.",
            });
        }

        // Delete the nurse from the database
        await Nurse.deleteOne({ nurse_id });

        return res.status(200).json({
            success: true,
            msg: "Nurse deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting nurse:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while deleting the nurse",
        });
    }
};

// ------------------------------------ UPDATE NURSE -----------------------------------
const updateNurse = async (req, res) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res
                .status(400)
                .json({
                    success: false,
                    msg: "Validation errors",
                    error: valErrors.array(),
                });
        }

        const { nurse_id, ...updateFields } = req.body;
        const existingNurse = await Nurse.findOne({ nurse_id });
        if (!existingNurse) {
            return res
                .status(400)
                .json({ success: false, msg: "Nurse with this ID does not exist" });
        }

        const updatedNurse = await Nurse.findOneAndUpdate(
            { nurse_id },
            { $set: updateFields },
            { new: true }
        );
        return res
            .status(200)
            .json({
                success: true,
                msg: "Nurse updated successfully",
                nurse: updatedNurse,
            });
    } catch (error) {
        console.error("Error updating nurse:", error);
        return res
            .status(500)
            .json({
                success: false,
                msg: error.message || "An error occurred while updating the nurse",
            });
    }
};

// ------------------------------ ADD CASE TO NURSE ------------------------------

const addCaseToNurse = async (req, res) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation errors",
                error: valErrors.array(),
            });
        }

        const { nurse_id, case_id } = req.body;

        // Check if the patient exists
        const existingPatient = await Patient.findOne({ patient_id: case_id });
        if (!existingPatient) {
            return res.status(400).json({
                success: false,
                msg: `Patient with ID ${case_id} does not exist`,
            });
        }

        // Check if the nurse exists
        const existingNurse = await Nurse.findOne({ nurse_id });
        if (!existingNurse) {
            return res.status(400).json({
                success: false,
                msg: `Nurse with ID ${nurse_id} does not exist`,
            });
        }

        // Check if the case (patient) is already assigned to the nurse
        if (existingNurse.case_ids.includes(case_id)) {
            return res.status(400).json({
                success: false,
                msg: "Patient is already assigned to this nurse",
            });
        }

        // Add patient_id to the nurse's case list
        existingNurse.case_ids.push(case_id);
        const updatedNurse = await existingNurse.save();

        return res.status(200).json({
            success: true,
            msg: "Patient added to nurse successfully",
            nurse: updatedNurse,
        });
    } catch (error) {
        console.error("Error adding patient to nurse:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while adding patient to nurse",
        });
    }
};

/**
 * Controller to remove a patient (case) from a nurse
 */
const removeCaseFromNurse = async (req, res) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation errors",
                error: valErrors.array(),
            });
        }

        const { nurse_id, case_id } = req.body;

        // Check if the patient exists
        const existingPatient = await Patient.findOne({ patient_id: case_id });
        if (!existingPatient) {
            return res.status(400).json({
                success: false,
                msg: `Patient with ID ${case_id} does not exist`,
            });
        }

        // Check if the nurse exists
        const existingNurse = await Nurse.findOne({ nurse_id });
        if (!existingNurse) {
            return res.status(400).json({
                success: false,
                msg: `Nurse with ID ${nurse_id} does not exist`,
            });
        }

        // Check if the case (patient) is assigned to the nurse
        if (!existingNurse.case_ids.includes(case_id)) {
            return res.status(400).json({
                success: false,
                msg: "Patient is not assigned to this nurse",
            });
        }

        // Remove patient_id from the nurse's case list
        existingNurse.case_ids = existingNurse.case_ids.filter(
            (id) => id !== case_id
        );
        const updatedNurse = await existingNurse.save();

        return res.status(200).json({
            success: true,
            msg: "Patient removed from nurse successfully",
            nurse: updatedNurse,
        });
    } catch (error) {
        console.error("Error removing patient from nurse:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while removing patient from nurse",
        });
    }
};

//--------------- Get Nurse by ID 

const getNurseById = async (req, res) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation errors",
                error: valErrors.array(),
            });
        }

        const { nurse_id } = req.params;
        const nurse = await Nurse.findOne({ nurse_id });

        if (!nurse) {
            return res.status(404).json({
                success: false,
                msg: "Nurse not found",
            });
        }

        return res.status(200).json({
            success: true,
            msg: "Nurse retrieved successfully",
            nurse,
        });
    } catch (error) {
        console.error("Error fetching nurse:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while fetching the nurse",
        });
    }
};


module.exports = {
    addNurse,
    deleteNurse,
    updateNurse,
    addCaseToNurse,
    removeCaseFromNurse,
    getNurseById

};
