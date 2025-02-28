const express = require("express");
const router = express.Router();

//------------------ To reset the password
const bodyParser = require("body-parser");

// to accept data from the form
router.use(bodyParser.json());
// to accept data from the URL
router.use(bodyParser.urlencoded({ extended: true }));

const {
    getAllNurses,
    getAllDoctors,
    getAllPatients,
    getCaseDetails
} = require("../controllers/controller.general");

//--------------------General Routes--------------------

//------ Get all Nurses
router.get("/general/get-all-nurses", getAllNurses);

// ---- get all doctors
router.get("/general/get-all-doctors", getAllDoctors);

// ---- get all patients
router.get("/general/get-all-patients", getAllPatients);

// ----- get all case Details 
router.get("/general/:case_id", getCaseDetails);

module.exports = router;