const fs = require("fs");
const prisma = require("../lib/prisma");
const cloudinary = require("../config/cloudinary");
const AppError = require("../utils/appError");

const uploadResume = async ({ file, userId, metadata = {} }) => {
  if (!file) {
    throw new AppError("Resume file is required", 400);
  }

  const allowedMimeTypes = ["application/pdf"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new AppError("Only PDF files are allowed", 400);
  }

  const existingResumes = await prisma.resume.findMany({
    where: { userId },
    orderBy: { version: "desc" },
  });

  const nextVersion = existingResumes.length > 0 ? existingResumes[0].version + 1 : 1;

  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: "raw",
    folder: "internpilot/resumes",
    public_id: `${userId}-${Date.now()}`,
  });

  const resume = await prisma.resume.create({
    data: {
      fileUrl: result.secure_url,
      publicId: result.public_id,
      filename: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      title: metadata.title || file.originalname,
      version: nextVersion,
      isPrimary: metadata.isPrimary ?? false,
      summary: metadata.summary || null,
      tags: metadata.tags || [],
      userId,
    },
  });

  if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }

  return resume;
};

const listUserResumes = async (userId) => {
  return prisma.resume.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

const getUserResume = async ({ userId, resumeId }) => {
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId,
    },
  });

  if (!resume) {
    throw new AppError("Resume not found", 404);
  }

  return resume;
};

const deleteResume = async ({ userId, resumeId }) => {
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId,
    },
  });

  if (!resume) {
    throw new AppError("Resume not found", 404);
  }

  if (resume.publicId) {
    try {
      await cloudinary.uploader.destroy(resume.publicId, { resource_type: "raw" });
    } catch (error) {
      console.warn("Cloudinary delete failed", error.message);
    }
  }

  await prisma.resume.delete({ where: { id: resumeId } });

  return { message: "Resume deleted successfully" };
};

module.exports = {
  uploadResume,
  listUserResumes,
  getUserResume,
  deleteResume,
};
