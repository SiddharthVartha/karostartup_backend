//dotenv for reading the environmental variables
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

//get the routers
const userRouters = require("./routers/user");
app.use("/api/users", userRouters);
app.use("/static", express.static("public"));
//database connection
const connectDB = require("./config/db");
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.download("certificate.jpg");
});

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
