const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");

//mongodb
const connect = require("./config/db");
// dotenv
require("dotenv").config();

// REST object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 3000;

// routes
app.use("/api/v1/", require("./routes/register.route"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the APP",
  });
});

app.listen(port, async () => {
  await connect();
  console.log(`Server is running on the port: ${port}`.bgGreen.white);
});
