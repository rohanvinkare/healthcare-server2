const { validationResult } = require("express-validator");
const Nurse = require("../models/model.nurse");
const Patient = require("../models/model.patient");
const Doctor = require("../models/model.doctor");
const VitalSigns = require("../models/model.vital");



const addVital = async (req, res) => {
    try {
        // Extract data from request body
        const { patient_id, vitalSigns } = req.body;

        if (!patient_id || !vitalSigns) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if vitals already exist for this patient
        const existingVital = await VitalSigns.findOne({ patient_id });

        if (existingVital) {
            return res.status(400).json({
                error: "Vital signs already exist for this patient. Consider updating instead."
            });
        }

        // Create new vital signs document
        const newVitalSigns = new VitalSigns({
            patient_id,
            heartRate: vitalSigns.heartRate,
            respiratoryRate: vitalSigns.respiratoryRate,
            bodyTemperature: vitalSigns.bodyTemperature,
            oxygenSaturation: vitalSigns.oxygenSaturation,
            bloodPressure: vitalSigns.bloodPressure,
            painLevel: vitalSigns.painLevel,
            glucose: vitalSigns.glucose
        });

        // Save to MongoDB
        const savedVitalSigns = await newVitalSigns.save();

        res.status(201).json({
            message: "Vital signs recorded successfully",
            data: savedVitalSigns
        });

    } catch (error) {
        console.error("Error saving vitals:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = { addVital }