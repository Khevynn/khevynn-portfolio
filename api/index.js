require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev")); // Logging middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static("public")); // Serve static files from public directory

const projectController = require("./controllers/projectController");

// Enable CORS for all routes
const cors = require("cors");
app.use(cors());

app.use("/api/projects", projectController);

// When we don't find anything
app.use((req, res, next) => {
  res.status(404).send({ msg: "No resource or page found." });
});

// When we find an error (means it was not treated previously)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
