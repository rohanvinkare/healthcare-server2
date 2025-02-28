const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./views");


const doctorRoutes = require("./routers/router.doctor");
// const nurseRoutes = require("./routes/nurseRoutes");
// const patientRoutes = require("./routes/patientRoutes");

app.use("/", doctorRoutes);

app.get("/", (req, res) => {
  res.send("Healthcare server 2 Successfully running ");
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is Running on ${process.env.PORT}`);
});