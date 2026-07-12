const asyncHandler = require("../utils/asyncHandler");
const {
  uploadResume: uploadResumeService,
  listUserResumes,
  getUserResume,
  deleteResume,
} = require("../services/resumeService");

const uploadResume = asyncHandler(async (req, res) => {
  const metadata = {
    title: req.body.title || undefined,
    summary: req.body.summary || undefined,
    isPrimary: req.body.isPrimary === "true",
    tags: req.body.tags ? req.body.tags.split(",") : [],
  };

  const resume = await uploadResumeService({
    file: req.file,
    userId: req.user.id,
    metadata,
  });

  res.status(201).json({
    message: "Resume uploaded successfully",
    resume,
  });
});

const listResumes = asyncHandler(async (req, res) => {
  const resumes = await listUserResumes(req.user.id);

  res.status(200).json({ resumes });
});

const getResume = asyncHandler(async (req, res) => {
  const resume = await getUserResume({
    userId: req.user.id,
    resumeId: req.params.id,
  });

  res.status(200).json({ resume });
});

const deleteResumeById = asyncHandler(async (req, res) => {
  const result = await deleteResume({
    userId: req.user.id,
    resumeId: req.params.id,
  });

  res.status(200).json(result);
});

module.exports = {
  uploadResume,
  listResumes,
  getResume,
  deleteResumeById,
};
