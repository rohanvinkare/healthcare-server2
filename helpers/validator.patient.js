const { check } = require("express-validator");

/**
 * Validator for adding a new patient
 */
exports.addPatientValidator = [
    check("first_name", "First name is required").not().isEmpty(),
    check("last_name", "Last name is required").not().isEmpty(),
    check("date_of_birth", "Date of birth is required and must be a valid date").isISO8601(),
    check("gender", "Gender is required").not().isEmpty(),
    check("contact_number", "Contact number should contain exactly 10 digits")
        .isLength({ min: 10, max: 10 })
        .isNumeric()
        .withMessage("Contact number must be numeric"),
    check("emergency_contact.name", "Emergency contact name is required").not().isEmpty(),
    check("emergency_contact.relationship", "Emergency contact relationship is required").not().isEmpty(),
    check("emergency_contact.contact_number", "Emergency contact number should contain exactly 10 digits")
        .isLength({ min: 10, max: 10 })
        .isNumeric()
        .withMessage("Emergency contact number must be numeric"),
    check("address.street", "Street address is required").not().isEmpty(),
    check("address.city", "City is required").not().isEmpty(),
    check("address.state", "State is required").not().isEmpty(),
    check("address.postal_code", "Postal code is required").not().isEmpty(),
    check("address.country", "Country is required").not().isEmpty(),
    check("blood_type", "Blood type is required").not().isEmpty(),
    check("patient_type", "Patient type is required and must be valid")
        .isIn([
            'child', 'young adult', 'athlete', 'pregnant', 'infant', 'adolescent', 'adult', 'elderly',
            'disabled', 'chronically ill', 'terminally ill', 'neonate', 'toddler', 'preschooler'
        ]),
    check("height", "Height is required and must be a number").isNumeric(),
    check("weight", "Weight is required and must be a number").isNumeric(),
    check("assigned_doctor_id")
        .isArray({ min: 1 })
        .withMessage("At least one assigned doctor ID is required")
        .custom((value) => value.every((id) => typeof id === "string"))
        .withMessage("Each doctor ID must be a string"),

    check("assigned_nurse_id")
        .isArray({ min: 1 })
        .withMessage("At least one assigned nurse ID is required")
        .custom((value) => value.every((id) => typeof id === "string"))
        .withMessage("Each nurse ID must be a string"),
];

/**
 * Validator for deleting a patient
 */
exports.deletePatientValidator = [
    check("patient_id", "Patient ID is required").not().isEmpty()
];

/**
 * Validator for updating patient details
 */
exports.updatePatientValidator = [
    check("patient_id", "Patient ID is required").not().isEmpty(),
    check("contact_number", "Contact number should contain exactly 10 digits")
        .optional()
        .isLength({ min: 10, max: 10 })
        .isNumeric()
        .withMessage("Contact number must be numeric"),
    check("height", "Height must be a number").optional().isNumeric(),
    check("weight", "Weight must be a number").optional().isNumeric(),
    check("assigned_doctor_id", "Assigned doctor ID is required if updating").optional().not().isEmpty(),
    check("assigned_nurse_id", "Assigned nurse ID is required if updating").optional().not().isEmpty()
];


exports.getPatientValidator = [
    check("patient_id", "Patient ID is required").not().isEmpty(),
];


