const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createApplicationHandler,
  listApplicationsHandler,
  getApplicationHandler,
  updateApplicationHandler,
  deleteApplicationHandler,
} = require("../controllers/applicationController");

router.post("/", authMiddleware, createApplicationHandler);
router.get("/", authMiddleware, listApplicationsHandler);
router.get("/:id", authMiddleware, getApplicationHandler);
router.patch("/:id", authMiddleware, updateApplicationHandler);
router.delete("/:id", authMiddleware, deleteApplicationHandler);

module.exports = router;
