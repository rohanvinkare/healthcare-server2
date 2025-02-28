const { check } = require("express-validator");

/**
 * Validator for adding a new nurse
 */
exports.addNurseValidator = [
    check("first_name", "First name is required").not().isEmpty(),
    check("last_name", "Last name is required").not().isEmpty(),
    check("license_number", "License number is required").not().isEmpty(),
    check("contact_number", "Contact number should contain exactly 10 digits")
        .isLength({ min: 10, max: 10 })
        .isNumeric()
        .withMessage("Contact number must be numeric"),
    check("email", "Please include a valid email").isEmail().normalizeEmail({
        gmail_remove_dots: true,
    }),
    check("department", "Department is required").not().isEmpty(),
    check("shift_information.shift_type", "Shift type is required and must be morning, evening, or night")
        .isIn(["morning", "evening", "night"]),
    check("shift_information.start_time", "Start time is required").not().isEmpty(),
    check("shift_information.end_time", "End time is required").not().isEmpty()
];

/**
 * Validator for deleting a nurse
 */
exports.deleteNurseValidator = [
    check("nurse_id", "Nurse ID is required").not().isEmpty()
];

/**
 * Validator for updating nurse details
 */
exports.updateNurseValidator = [
    check("nurse_id", "Nurse ID is required").not().isEmpty(),
    check("email", "Please include a valid email").optional().isEmail().normalizeEmail({
        gmail_remove_dots: true,
    }),
    check("contact_number", "Contact number should be exactly 10 digits")
        .optional()
        .isLength({ min: 10, max: 10 })
        .isNumeric()
        .withMessage("Contact number must be numeric"),
    check("shift_information.shift_type", "Shift type must be morning, evening, or night")
        .optional()
        .isIn(["morning", "evening", "night"]),
    check("shift_information.start_time", "Start time is required if updating shift information").optional().not().isEmpty(),
    check("shift_information.end_time", "End time is required if updating shift information").optional().not().isEmpty()
];

/**
 * Validator for adding a case to a nurse
 */
exports.addCaseToNurseValidator = [
    check("nurse_id", "Nurse ID is required").not().isEmpty(),
    check("case_id", "Case ID is required").not().isEmpty()
];

/**
 * Validator for removing a case from a nurse
 */
exports.removeCaseToNurseValidator = [
    check("nurse_id", "Nurse ID is required").not().isEmpty(),
    check("case_id", "Case ID is required").not().isEmpty()
];


exports.getNurseValidator = [
    check("nurse_id", "Nurse ID is required").not().isEmpty(),
];
