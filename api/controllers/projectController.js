const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const projectServices = require("../services/projectServices");

// Initialize cookie parser middleware
router.use(cookieParser());

/* Get all projects */
router.get("/", async function (req, res, next) {
  try {
    const result = await projectServices.getAllProjects();
    res.status(result.status).send(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/* Get project by ID */
router.get("/:id", async function (req, res, next) {
  try {
    const result = await projectServices.getProjectById(req.params.id);
    res.status(result.status).send(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/* Create new project */
router.post(
  "/",
  auth.verifyAuth,
  upload.single("image"),
  async function (req, res, next) {
    try {
      const result = await projectServices.createProject(req.body, req.file);
      res.status(result.status).send(result.data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

/* Update project */
router.put(
  "/:id",
  auth.verifyAuth,
  upload.single("image"),
  async function (req, res, next) {
    try {
      const result = await projectServices.updateProject(
        req.params.id,
        req.body,
        req.file
      );
      res.status(result.status).send(result.data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

/* Delete project */
router.delete("/:id", auth.verifyAuth, async function (req, res, next) {
  try {
    const result = await projectServices.deleteProject(req.params.id);
    res.status(result.status).send(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
