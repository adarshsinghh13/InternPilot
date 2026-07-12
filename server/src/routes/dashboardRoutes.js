const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getSummaryHandler,
  getRecentApplicationsHandler,
  getTopCompaniesHandler,
} = require("../controllers/dashboardController");

router.get("/summary", authMiddleware, getSummaryHandler);
router.get("/recent-applications", authMiddleware, getRecentApplicationsHandler);
router.get("/top-companies", authMiddleware, getTopCompaniesHandler);

module.exports = router;
