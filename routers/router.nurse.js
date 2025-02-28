const express = require("express");
const router = express.Router();

//------------------ To reset the password
const bodyParser = require("body-parser");

// to accept data from the form
router.use(bodyParser.json());
// to accept data from the URL
router.use(bodyParser.urlencoded({ extended: true }));

const {
    addNurseValidator,
    deleteNurseValidator,
    updateNurseValidator,
    addCaseToNurseValidator,
    removeCaseToNurseValidator,
    getNurseValidator

} = require("../helpers/validator.nurse");

const { addNurse, deleteNurse, updateNurse, addCaseToNurse, removeCaseFromNurse, getAllNurses, getNurseById } = require("../controllers/controller.nurse");


//--------------------Nurse Routes--------------------

//------ Create Nurse
router.post("/nurse/add-nurse", addNurseValidator, addNurse);

//------ Delete Nurse
router.delete("/nurse/delete-nurse", deleteNurseValidator, deleteNurse);

//------ Update Nurse
router.put("/nurse/update-nurse", updateNurseValidator, updateNurse);

//------ Add caseID to the Nurse
router.put("/nurse/add-case", addCaseToNurseValidator, addCaseToNurse);

//------ Remove caseID from the Nurse
router.put("/nurse/remove-case", removeCaseToNurseValidator, removeCaseFromNurse);

//------Get Nurse by ID 
router.get("/nurse/get-nurse/:nurse_id", getNurseValidator, getNurseById);



module.exports = router;