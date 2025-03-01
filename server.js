const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

// Initialize Express App
const app = express();

// Connect to Database
connectDB();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set static files directory (Ensure absolute path to avoid unexpected directory creation)
app.use(express.static(path.join(__dirname, "public")));

// Set View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Swagger UI Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const doctorRoutes = require("./routers/router.doctor");
const nurseRoutes = require("./routers/router.nurse");
const patientRoutes = require("./routers/router.patient");
const generalRoutes = require("./routers/router.general");
const vitalRoutes = require("./routers/router.vital");

app.use("/", doctorRoutes);
app.use("/", nurseRoutes);
app.use("/", patientRoutes);
app.use("/", generalRoutes);
app.use("/", vitalRoutes);


// Home Route
app.get("/", (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Healthcare Server</title>
          <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
              h1 { color: #2c3e50; }
              a { text-decoration: none; color: #3498db; font-weight: bold; }
              a:hover { color: #2980b9; }
          </style>
      </head>
      <body>
          <h1>Healthcare Server Successfully Running</h1>
          <p>Explore the API documentation here:</p>
          <a href="/api-docs" target="_blank">Swagger API Documentation</a>
      </body>
      </html>
  `);
});


// Start Server
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
