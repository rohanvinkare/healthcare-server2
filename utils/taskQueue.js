const { Worker } = require("worker_threads");

const taskQueue = [];
const taskTracking = new Map(); // Track tasks by patient ID
const MAX_WORKERS = 3; // Adjust this based on server capacity
const workers = [];

// Initialize workers
for (let i = 0; i < MAX_WORKERS; i++) {
    const worker = new Worker(require.resolve("./taskWorker"));
    workers.push(worker);

    worker.on("message", (msg) => {
        console.log(`✅ Task Completed for Patient ${msg.patient_id}`, msg);

        // Send result back to the correct requester
        if (taskTracking.has(msg.patient_id)) {
            taskTracking.get(msg.patient_id).resolve(msg);
            taskTracking.delete(msg.patient_id);
        }

        assignTaskToWorker(worker);
    });

    worker.on("error", (err) => {
        console.error("❌ Worker Error:", err);
        assignTaskToWorker(worker);
    });

    worker.on("exit", (code) => {
        console.log(`⚠️ Worker Stopped (Exit Code: ${code})`);
    });
}

// Assign task to an available worker
function assignTaskToWorker(worker) {
    if (taskQueue.length > 0) {
        const { patient_id, patient_data, resolve, reject } = taskQueue.shift();
        taskTracking.set(patient_id, { resolve, reject });

        worker.postMessage({ patient_id, patient_data });
    }
}

// Add a new patient task
function addTaskToQueue(patient_id, patient_data) {
    return new Promise((resolve, reject) => {
        taskQueue.push({ patient_id, patient_data, resolve, reject });
        const availableWorker = workers.find(worker => worker.threadId);
        if (availableWorker) assignTaskToWorker(availableWorker);
    });
}

module.exports = { addTaskToQueue };
