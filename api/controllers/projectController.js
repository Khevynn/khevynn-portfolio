const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const projectServices = require("../services/projectServices");

// Initialize cookie parser middleware
router.use(cookieParser());

/* ─── Public Routes ──────────────────────────────────────── */

/** GET /api/projects - all published projects */
router.get("/", async function (req, res) {
  try {
    const result = await projectServices.getAllProjects();
    res.status(result.status).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/** GET /api/projects/featured - featured + published projects */
router.get("/featured", async function (req, res) {
  try {
    const result = await projectServices.getFeaturedProjects();
    res.status(result.status).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/** GET /api/projects/slug/:slug - single project by slug */
router.get("/slug/:slug", async function (req, res) {
  try {
    const result = await projectServices.getProjectBySlug(req.params.slug);
    res.status(result.status).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/** GET /api/projects/:id - single project by ID */
router.get("/:id", async function (req, res) {
  try {
    const result = await projectServices.getProjectById(req.params.id);
    res.status(result.status).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* ─── Protected Routes (Admin) ───────────────────────────── */

/** GET /api/projects/admin/all - all projects including unpublished */
router.get("/admin/all", auth.verifyAuth, async function (req, res) {
  try {
    const result = await projectServices.getAllProjectsAdmin();
    res.status(result.status).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/** POST /api/projects - create new project (up to 5 images) */
router.post(
  "/",
  auth.verifyAuth,
  upload.array("images", 5),
  async function (req, res) {
    try {
      const result = await projectServices.createProject(req.body, req.files);
      res.status(result.status).send(result.data);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

/** PUT /api/projects/:id - update project (up to 5 images) */
router.put(
  "/:id",
  auth.verifyAuth,
  upload.array("images", 5),
  async function (req, res) {
    try {
      const result = await projectServices.updateProject(
        req.params.id,
        req.body,
        req.files
      );
      res.status(result.status).send(result.data);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

/** DELETE /api/projects/:id */
router.delete("/:id", auth.verifyAuth, async function (req, res) {
  try {
    const result = await projectServices.deleteProject(req.params.id);
    res.status(result.status).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/** PATCH /api/projects/:id/feature - toggle featured flag */
router.patch("/:id/feature", auth.verifyAuth, async function (req, res) {
  try {
    const result = await projectServices.toggleFeatured(req.params.id);
    res.status(result.status).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/** PATCH /api/projects/:id/publish - toggle published flag */
router.patch("/:id/publish", auth.verifyAuth, async function (req, res) {
  try {
    const result = await projectServices.togglePublished(req.params.id);
    res.status(result.status).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/** PATCH /api/projects/reorder - bulk update display_order */
router.patch("/reorder", auth.verifyAuth, async function (req, res) {
  try {
    // Body: { projects: [{ id: 1, order: 0 }, { id: 3, order: 1 }] }
    const result = await projectServices.reorderProjects(req.body.projects);
    res.status(result.status).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
