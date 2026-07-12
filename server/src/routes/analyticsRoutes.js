const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getOverviewHandler,
  getMonthlyHandler,
  getCompanyBreakdownHandler,
} = require("../controllers/analyticsController");

router.get("/overview", authMiddleware, getOverviewHandler);
router.get("/monthly", authMiddleware, getMonthlyHandler);
router.get("/company-breakdown", authMiddleware, getCompanyBreakdownHandler);

module.exports = router;
