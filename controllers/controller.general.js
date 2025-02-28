const { validationResult } = require("express-validator");
const Nurse = require("../models/model.nurse");
const Patient = require("../models/model.patient");
const Doctor = require("../models/model.doctor");

// ------------------------------ FETCH ALL NURSES ------------------------------
const getAllNurses = async (req, res) => {
    try {
        const nurses = await Nurse.find();
        return res
            .status(200)
            .json({ success: true, msg: "Nurses retrieved successfully", nurses });
    } catch (error) {
        console.error("Error fetching nurses:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while fetching nurses",
        });
    }
};

// ------------------------------ FETCH ALL DOCTORS ------------------------------

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();

        return res.status(200).json({
            success: true,
            msg: "Doctors retrieved successfully",
            doctors,
        });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while fetching doctors",
        });
    }
};

// ------------------------------ FETCH ALL PATIENTS ------------------------------
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        return res.status(200).json({
            success: true,
            msg: "Patients retrieved successfully",
            patients,
        });
    } catch (error) {
        console.error("Error fetching patients:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while fetching patients",
        });
    }
};

//--------------------------------- Get all case Details -----------------------
const getCaseDetails = async (req, res) => {
    try {
        const { case_id } = req.params;
        if (!case_id) {
            return res
                .status(400)
                .json({ success: false, msg: "Case ID is required" });
        }

        console.log("Searching for Case ID:", case_id);

        const caseDetails = await Patient.aggregate([
            { $match: { patient_id: case_id } },
            {
                $lookup: {
                    from: "doctors",
                    localField: "assigned_doctor_id",
                    foreignField: "doctor_id",
                    as: "doctor_info",
                },
            },
            {
                $lookup: {
                    from: "nurses",
                    localField: "assigned_nurse_id",
                    foreignField: "nurse_id",
                    as: "nurse_info",
                },
            },
        ]);



        if (!caseDetails.length) {
            return res.status(404).json({ success: false, msg: "Case not found" });
        }

        return res.status(200).json({
            success: true,
            msg: "Case details retrieved successfully",
            caseDetails: caseDetails[0],
        });
    } catch (error) {
        console.error("Error fetching case details:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "An error occurred while fetching case details",
        });
    }
};

module.exports = {
    getAllNurses,
    getAllDoctors,
    getAllPatients,
    getCaseDetails,
};
