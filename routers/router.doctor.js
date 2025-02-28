const express = require("express");
const router = express.Router();

//------------------ To reset the password
const bodyParser = require("body-parser");

// to accept data from the form
router.use(bodyParser.json());
// to accept data from the URL
router.use(bodyParser.urlencoded({ extended: true }));

const { addDoctorValidator, deleteDoctorValidator, updateDoctorValidator, addCaseToDoctorValidator, removeCaseToDoctorValidator, validateDoctorId } = require("../helpers/validator.doctor");

const { addDoctor, deleteDoctor, updateDoctor, addCaseToDoctor, removeCaseFromDoctor, getDoctorById } = require("../controllers/controller.doctor");


//--------------------Doctor Routes--------------------

//------ Create Doctor
router.post("/doctor/add-doctor", addDoctorValidator, addDoctor);

//------ Delete Doctor
router.delete("/doctor/delete-doctor", deleteDoctorValidator, deleteDoctor);

//------ Update Doctor
router.put("/doctor/update-doctor", updateDoctorValidator, updateDoctor);

//------ Add caseID to the Doctor
router.put("/doctor/add-case", addCaseToDoctorValidator, addCaseToDoctor);

//------ Remove caseID from the Doctor
router.put("/doctor/remove-case", removeCaseToDoctorValidator, removeCaseFromDoctor);

//----- Get doctor by ID
router.get("/doctor/get-doctor/:doctor_id", validateDoctorId, getDoctorById);



module.exports = router;
