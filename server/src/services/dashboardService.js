const prisma = require("../lib/prisma");

const getDashboardSummary = async (userId) => {
  const [
    totalApplications,
    savedCount,
    appliedCount,
    oaCount,
    interviewCount,
    offerCount,
    rejectedCount,
    totalResumes,
  ] = await Promise.all([
    prisma.application.count({ where: { userId } }),
    prisma.application.count({ where: { userId, status: "SAVED" } }),
    prisma.application.count({ where: { userId, status: "APPLIED" } }),
    prisma.application.count({ where: { userId, status: "OA" } }),
    prisma.application.count({ where: { userId, status: "INTERVIEW" } }),
    prisma.application.count({ where: { userId, status: "OFFER" } }),
    prisma.application.count({ where: { userId, status: "REJECTED" } }),
    prisma.resume.count({ where: { userId } }),
  ]);

  return {
    totalApplications,
    savedCount,
    appliedCount,
    oaCount,
    interviewCount,
    offerCount,
    rejectedCount,
    totalResumes,
  };
};

const getRecentApplications = async (userId) => {
  return prisma.application.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: 10,
    select: {
      id: true,
      companyName: true,
      jobTitle: true,
      status: true,
      updatedAt: true,
    },
  });
};

const getTopCompanies = async (userId) => {
  const rows = await prisma.application.groupBy({
    by: ["companyName"],
    where: { userId },
    _count: {
      id: true,
    },
  });

  return rows
    .map((row) => ({
      companyName: row.companyName,
      applications: row._count.id,
    }))
    .sort((a, b) => b.applications - a.applications)
    .slice(0, 10);
};

module.exports = {
  getDashboardSummary,
  getRecentApplications,
  getTopCompanies,
};
