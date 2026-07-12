const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  uploadResume,
  listResumes,
  getResume,
  deleteResumeById,
} = require("../controllers/resumeController");

router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);
router.get("/", authMiddleware, listResumes);
router.get("/:id", authMiddleware, getResume);
router.delete("/:id", authMiddleware, deleteResumeById);

module.exports = router;