const asyncHandler = require("../utils/asyncHandler");
const {
  getDashboardSummary,
  getRecentApplications,
  getTopCompanies,
} = require("../services/dashboardService");

const getSummaryHandler = asyncHandler(async (req, res) => {
  const summary = await getDashboardSummary(req.user.id);

  res.status(200).json(summary);
});

const getRecentApplicationsHandler = asyncHandler(async (req, res) => {
  const applications = await getRecentApplications(req.user.id);

  res.status(200).json(applications);
});

const getTopCompaniesHandler = asyncHandler(async (req, res) => {
  const companies = await getTopCompanies(req.user.id);

  res.status(200).json(companies);
});

module.exports = {
  getSummaryHandler,
  getRecentApplicationsHandler,
  getTopCompaniesHandler,
};
