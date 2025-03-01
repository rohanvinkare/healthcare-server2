const express = require("express");
const router = express.Router();

//------------------ To reset the password
const bodyParser = require("body-parser");

// to accept data from the form
router.use(bodyParser.json());
// to accept data from the URL
router.use(bodyParser.urlencoded({ extended: true }));

const {
    addPatientValidator, deletePatientValidator, updatePatientValidator,
    getPatientValidator
} = require("../helpers/validator.patient");



const { addPatient, deletePatient } = require("../controllers/controller.patient");



//--------------------Patient Routes--------------------

//------ Create Patient
router.post("/patient/add-patient", addPatientValidator, addPatient);



// ------ Delete Patient
router.delete("/patient/delete-patient/:patient_id", deletePatientValidator, deletePatient);

module.exports = router;