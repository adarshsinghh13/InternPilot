const asyncHandler = require("../utils/asyncHandler");
const {
  createApplication,
  listApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} = require("../services/applicationService");

const createApplicationHandler = asyncHandler(async (req, res) => {
  const application = await createApplication({
    userId: req.user.id,
    data: req.body,
  });

  res.status(201).json({
    message: "Application created successfully",
    application,
  });
});

const listApplicationsHandler = asyncHandler(async (req, res) => {
  const applications = await listApplications(req.user.id);

  res.status(200).json({ applications });
});

const getApplicationHandler = asyncHandler(async (req, res) => {
  const application = await getApplicationById({
    userId: req.user.id,
    applicationId: req.params.id,
  });

  res.status(200).json({ application });
});

const updateApplicationHandler = asyncHandler(async (req, res) => {
  const application = await updateApplication({
    userId: req.user.id,
    applicationId: req.params.id,
    data: req.body,
  });

  res.status(200).json({
    message: "Application updated successfully",
    application,
  });
});

const deleteApplicationHandler = asyncHandler(async (req, res) => {
  const result = await deleteApplication({
    userId: req.user.id,
    applicationId: req.params.id,
  });

  res.status(200).json(result);
});

module.exports = {
  createApplicationHandler,
  listApplicationsHandler,
  getApplicationHandler,
  updateApplicationHandler,
  deleteApplicationHandler,
};
