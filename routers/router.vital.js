const express = require("express");
const router = express.Router();

//------------------ To reset the password
const bodyParser = require("body-parser");

// to accept data from the form
router.use(bodyParser.json());
// to accept data from the URL
router.use(bodyParser.urlencoded({ extended: true }));

// const { addVitalValidator } = require("../helpers/validator.vital")

const { addVital } = require("../controllers/controller.vital");

//------------------ To Add vital signs
router.post("/vital/add-vital", addVital)


module.exports = router;