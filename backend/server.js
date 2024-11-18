// Requirements
const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // This will establish the connection
const bodyParser = require("body-parser");

const app = express();

require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

app.get("/", (req, res) => {
  res.send("Hello, form the police assessment server Backend!!");
});

// Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
