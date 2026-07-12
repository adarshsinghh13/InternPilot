const asyncHandler = require("../utils/asyncHandler");
const {
  getOverview,
  getMonthlyStats,
  getCompanyBreakdown,
} = require("../services/analyticsService");

const getOverviewHandler = asyncHandler(async (req, res) => {
  const overview = await getOverview(req.user.id);

  res.status(200).json(overview);
});

const getMonthlyHandler = asyncHandler(async (req, res) => {
  const monthly = await getMonthlyStats(req.user.id);

  res.status(200).json(monthly);
});

const getCompanyBreakdownHandler = asyncHandler(async (req, res) => {
  const breakdown = await getCompanyBreakdown(req.user.id);

  res.status(200).json(breakdown);
});

module.exports = {
  getOverviewHandler,
  getMonthlyHandler,
  getCompanyBreakdownHandler,
};
