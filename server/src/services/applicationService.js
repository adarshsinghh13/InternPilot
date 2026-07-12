const prisma = require("../lib/prisma");
const AppError = require("../utils/appError");

const validStatuses = ["SAVED", "APPLIED", "OA", "INTERVIEW", "OFFER", "REJECTED"];

const validateApplicationPayload = ({ companyName, jobTitle, status }) => {
  if (!companyName || typeof companyName !== "string" || companyName.trim() === "") {
    throw new AppError("companyName is required", 400);
  }

  if (!jobTitle || typeof jobTitle !== "string" || jobTitle.trim() === "") {
    throw new AppError("jobTitle is required", 400);
  }

  if (status && !validStatuses.includes(status)) {
    throw new AppError("status must be one of: SAVED, APPLIED, OA, INTERVIEW, OFFER, REJECTED", 400);
  }
};

const createApplication = async ({ userId, data }) => {
  validateApplicationPayload({
    companyName: data.companyName,
    jobTitle: data.jobTitle,
    status: data.status,
  });

  return prisma.application.create({
    data: {
      companyName: data.companyName.trim(),
      jobTitle: data.jobTitle.trim(),
      jobUrl: data.jobUrl ? data.jobUrl.trim() : null,
      status: data.status || "SAVED",
      notes: data.notes ? data.notes.trim() : null,
      appliedAt: data.appliedAt ? new Date(data.appliedAt) : null,
      userId,
    },
  });
};

const listApplications = async (userId) => {
  return prisma.application.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
};

const getApplicationById = async ({ userId, applicationId }) => {
  const application = await prisma.application.findFirst({
    where: { id: applicationId, userId },
  });

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  return application;
};

const updateApplication = async ({ userId, applicationId, data }) => {
  const existing = await prisma.application.findFirst({
    where: { id: applicationId, userId },
  });

  if (!existing) {
    throw new AppError("Application not found", 404);
  }

  if (data.companyName !== undefined) {
    validateApplicationPayload({
      companyName: data.companyName,
      jobTitle: existing.jobTitle,
      status: data.status ?? existing.status,
    });
  }

  if (data.jobTitle !== undefined) {
    validateApplicationPayload({
      companyName: data.companyName ?? existing.companyName,
      jobTitle: data.jobTitle,
      status: data.status ?? existing.status,
    });
  }

  if (data.status !== undefined) {
    validateApplicationPayload({
      companyName: data.companyName ?? existing.companyName,
      jobTitle: data.jobTitle ?? existing.jobTitle,
      status: data.status,
    });
  }

  return prisma.application.update({
    where: { id: applicationId },
    data: {
      companyName: data.companyName !== undefined ? data.companyName.trim() : undefined,
      jobTitle: data.jobTitle !== undefined ? data.jobTitle.trim() : undefined,
      jobUrl: data.jobUrl !== undefined ? (data.jobUrl ? data.jobUrl.trim() : null) : undefined,
      status: data.status !== undefined ? data.status : undefined,
      notes: data.notes !== undefined ? (data.notes ? data.notes.trim() : null) : undefined,
      appliedAt: data.appliedAt !== undefined ? (data.appliedAt ? new Date(data.appliedAt) : null) : undefined,
    },
  });
};

const deleteApplication = async ({ userId, applicationId }) => {
  const existing = await prisma.application.findFirst({
    where: { id: applicationId, userId },
  });

  if (!existing) {
    throw new AppError("Application not found", 404);
  }

  await prisma.application.delete({ where: { id: applicationId } });

  return { message: "Application deleted successfully" };
};

module.exports = {
  createApplication,
  listApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
