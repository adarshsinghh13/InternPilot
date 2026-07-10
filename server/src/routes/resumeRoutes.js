const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
} = require("../controllers/resumeController");
console.log("authMiddleware:", authMiddleware);
console.log("upload:", upload);
console.log("uploadResume:", uploadResume);

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

module.exports = router;