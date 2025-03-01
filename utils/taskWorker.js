
const { parentPort } = require("worker_threads");
const axios = require("axios");

// Replace with your Gen AI API and Database API URLs
const GEN_AI_API_URL = process.env.GEN_AI_API_URL_A;
const DATABASE_API_URL = process.env.DATABASE_API_URL_A;
// Existing API to insert data

parentPort.on("message", async (task) => {
    try {
        console.log("Processing Task for Patient:", task.patient_id);


        // Send patient data to Gen AI server
        const response = await axios.post(GEN_AI_API_URL, task.patient_data);
        console.log(`✅ Gen AI Response Received for Patient: ${task.patient_id}`);

        // Prepare payload for database API
        const vitalData = {
            patient_id: task.patient_id,  // Ensure patient_id is stored as a string
            vitalSigns: response.data.vitalSigns   // Store only vitalSigns data
        };

        console.log("Forwarding Processed Data to API:");

        // Call existing API to insert data  into MongoDB
        await axios.post(DATABASE_API_URL, vitalData);

        parentPort.postMessage({ success: true, patient_id: task.patient_id });
    } catch (error) {
        console.error(`❌ Error Processing Patient ${task.patient_id}:`, error.message);
        parentPort.postMessage({ success: false, error: error.message });
    }
});
