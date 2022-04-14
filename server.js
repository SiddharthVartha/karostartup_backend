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

//database connection
const connectDB = require("./config/db");
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
