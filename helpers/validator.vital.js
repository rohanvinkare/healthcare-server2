// const { check } = require("express-validator");

// /**
//  * Validator for adding a new vital entry
//  */
// exports.addVitalValidator = [
//     check("patient_id", "Patient ID is required").not().isEmpty(),
//     check("vitalSigns.heartRate.min", "Heart rate min must be a number").isNumeric(),
//     check("vitalSigns.heartRate.max", "Heart rate max must be a number").isNumeric(),
//     check("vitalSigns.heartRate.critical_low", "Heart rate critical_low must be a number").isNumeric(),
//     check("vitalSigns.heartRate.critical_high", "Heart rate critical_high must be a number").isNumeric(),

//     check("vitalSigns.respiratoryRate.min", "Respiratory rate min must be a number").isNumeric(),
//     check("vitalSigns.respiratoryRate.max", "Respiratory rate max must be a number").isNumeric(),
//     check("vitalSigns.respiratoryRate.critical_low", "Respiratory rate critical_low must be a number").isNumeric(),
//     check("vitalSigns.respiratoryRate.critical_high", "Respiratory rate critical_high must be a number").isNumeric(),

//     check("vitalSigns.bodyTemperature.min", "Body temperature min must be a number").isNumeric(),
//     check("vitalSigns.bodyTemperature.max", "Body temperature max must be a number").isNumeric(),
//     check("vitalSigns.bodyTemperature.critical_low", "Body temperature critical_low must be a number").isNumeric(),
//     check("vitalSigns.bodyTemperature.critical_high", "Body temperature critical_high must be a number").isNumeric(),

//     check("vitalSigns.oxygenSaturation.min", "Oxygen saturation min must be a number").isNumeric(),
//     check("vitalSigns.oxygenSaturation.max", "Oxygen saturation max must be a number").isNumeric(),
//     check("vitalSigns.oxygenSaturation.critical_low", "Oxygen saturation critical_low must be a number").isNumeric(),

//     check("vitalSigns.bloodPressure.systolic.min", "Systolic min must be a number").isNumeric(),
//     check("vitalSigns.bloodPressure.systolic.max", "Systolic max must be a number").isNumeric(),
//     check("vitalSigns.bloodPressure.systolic.critical_low", "Systolic critical_low must be a number").isNumeric(),
//     check("vitalSigns.bloodPressure.systolic.critical_high", "Systolic critical_high must be a number").isNumeric(),

//     check("vitalSigns.bloodPressure.diastolic.min", "Diastolic min must be a number").isNumeric(),
//     check("vitalSigns.bloodPressure.diastolic.max", "Diastolic max must be a number").isNumeric(),
//     check("vitalSigns.bloodPressure.diastolic.critical_low", "Diastolic critical_low must be a number").isNumeric(),
//     check("vitalSigns.bloodPressure.diastolic.critical_high", "Diastolic critical_high must be a number").isNumeric(),
// ];

// /**
//  * Validator for updating a vital entry
//  */
// exports.updateVitalValidator = [
//     check("vital_id", "Vital ID is required").not().isEmpty(),
//     check("patient_id", "Patient ID is required").not().isEmpty(),
//     check("vitalSigns.heartRate.min", "Heart rate min must be a number").optional().isNumeric(),
//     check("vitalSigns.heartRate.max", "Heart rate max must be a number").optional().isNumeric(),
//     check("vitalSigns.heartRate.critical_low", "Heart rate critical_low must be a number").optional().isNumeric(),
//     check("vitalSigns.heartRate.critical_high", "Heart rate critical_high must be a number").optional().isNumeric(),

//     check("vitalSigns.respiratoryRate.min", "Respiratory rate min must be a number").optional().isNumeric(),
//     check("vitalSigns.respiratoryRate.max", "Respiratory rate max must be a number").optional().isNumeric(),
//     check("vitalSigns.respiratoryRate.critical_low", "Respiratory rate critical_low must be a number").optional().isNumeric(),
//     check("vitalSigns.respiratoryRate.critical_high", "Respiratory rate critical_high must be a number").optional().isNumeric(),

//     check("vitalSigns.bodyTemperature.min", "Body temperature min must be a number").optional().isNumeric(),
//     check("vitalSigns.bodyTemperature.max", "Body temperature max must be a number").optional().isNumeric(),
//     check("vitalSigns.bodyTemperature.critical_low", "Body temperature critical_low must be a number").optional().isNumeric(),
//     check("vitalSigns.bodyTemperature.critical_high", "Body temperature critical_high must be a number").optional().isNumeric(),

//     check("vitalSigns.oxygenSaturation.min", "Oxygen saturation min must be a number").optional().isNumeric(),
//     check("vitalSigns.oxygenSaturation.max", "Oxygen saturation max must be a number").optional().isNumeric(),
//     check("vitalSigns.oxygenSaturation.critical_low", "Oxygen saturation critical_low must be a number").optional().isNumeric(),

//     check("vitalSigns.bloodPressure.systolic.min", "Systolic min must be a number").optional().isNumeric(),
//     check("vitalSigns.bloodPressure.systolic.max", "Systolic max must be a number").optional().isNumeric(),
//     check("vitalSigns.bloodPressure.systolic.critical_low", "Systolic critical_low must be a number").optional().isNumeric(),
//     check("vitalSigns.bloodPressure.systolic.critical_high", "Systolic critical_high must be a number").optional().isNumeric(),

//     check("vitalSigns.bloodPressure.diastolic.min", "Diastolic min must be a number").optional().isNumeric(),
//     check("vitalSigns.bloodPressure.diastolic.max", "Diastolic max must be a number").optional().isNumeric(),
//     check("vitalSigns.bloodPressure.diastolic.critical_low", "Diastolic critical_low must be a number").optional().isNumeric(),
//     check("vitalSigns.bloodPressure.diastolic.critical_high", "Diastolic critical_high must be a number").optional().isNumeric(),
// ];

// /**
//  * Validator for deleting a vital entry
//  */
// exports.deleteVitalValidator = [
//     check("vital_id", "Vital ID is required").not().isEmpty(),
// ];

