require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev")); // Logging middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static("public")); // Serve static files from public directory

const projectController = require("./controllers/projectController");
const authController = require("./controllers/authController");

// Enable CORS for all routes
const cors = require("cors");
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Allow all origins or specify a specific one
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

console.log("CORS enabled for origin:", process.env.CORS_ORIGIN || "*");

app.use("/api/projects", projectController);
app.use("/api/auth", authController);

// When we don't find anything
app.use((req, res, next) => {
  console.error(`404 Not Found: ${req.originalUrl}`);
  res.status(404).send({ msg: "No resource or page found." });
});

// When we find an error (means it was not treated previously)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
