const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();


// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./views");


const doctorRoutes = require("./routers/router.doctor");
const nurseRoutes = require("./routers/router.nurse");
const patientRoutes = require("./routers/router.patient");
const generalRoutes = require("./routers/router.general");

app.use("/", doctorRoutes);
app.use("/", nurseRoutes);
app.use("/", patientRoutes)
app.use("/", generalRoutes);

app.get("/", (req, res) => {
  res.send("Healthcare server 2 Successfully running ");
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is Running on ${process.env.PORT}`);
});