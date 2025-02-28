const { check } = require("express-validator");
/**
 * Validator for adding a new doctor
 */
exports.addDoctorValidator = [
  // Validate first name
  check("first_name", "First name is required").not().isEmpty(),

  // Validate last name
  check("last_name", "Last name is required").not().isEmpty(),

  // Validate license number
  check("license_number", "License number is required").not().isEmpty(),

  // Validate specialization
  check("specialization", "Specialization is required").not().isEmpty(),

  // Validate contact number (exactly 10 digits, numeric only)
  check("contact_number", "Contact number should contain exactly 10 digits")
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage("Contact number must be numeric"),

  // Validate email
  check("email", "Please include a valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),

  // Validate department
  check("department", "Department is required").not().isEmpty(),

  // Validate schedule array
  check("schedule", "Schedule is required and should be an array")
    .isArray({ min: 1 })
    .withMessage("Schedule must contain at least one entry"),

  // Validate each schedule entry
  check("schedule.*.day", "Day is required in schedule").not().isEmpty(),
  check("schedule.*.start_time", "Start time is required in schedule").not().isEmpty(),
  check("schedule.*.end_time", "End time is required in schedule").not().isEmpty(),

];


// Validator for deleting a doctor
exports.deleteDoctorValidator = [
  check("doctor_id", "Doctor ID is required").not().isEmpty()
];

// Validator for updating doctor details
exports.updateDoctorValidator = [
  check("doctor_id", "Doctor ID is required").not().isEmpty(),
  check("email", "Please include a valid email").optional().isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("contact_number", "Contact number should be exactly 10 digits")
    .optional()
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage("Contact number must be numeric"),
  check("schedule", "Schedule must be an array").optional().isArray(),
  check("schedule.*.day", "Each schedule entry must have a day").optional().not().isEmpty(),
  check("schedule.*.start_time", "Each schedule entry must have a start time").optional().not().isEmpty(),
  check("schedule.*.end_time", "Each schedule entry must have an end time").optional().not().isEmpty()
];

// Validator for adding a case to a doctor
exports.addCaseToDoctorValidator = [
  check("doctor_id", "Doctor ID is required").not().isEmpty(),
  check("case_id", "Case ID is required").not().isEmpty()
];


// Validator for adding a case to a doctor
exports.removeCaseToDoctorValidator = [
  check("doctor_id", "Doctor ID is required").not().isEmpty(),
  check("case_id", "Case ID is required").not().isEmpty()
];


// Validator for getting a doctor by ID
exports.validateDoctorId = [
  check("doctor_id", "Doctor ID is required").not().isEmpty()
];
