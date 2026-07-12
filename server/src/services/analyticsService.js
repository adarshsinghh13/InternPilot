const prisma = require("../lib/prisma");

const getOverview = async (userId) => {
  const [totalApplications, savedCount, appliedCount, oaCount, interviewCount, offerCount, rejectedCount] = await Promise.all([
    prisma.application.count({ where: { userId } }),
    prisma.application.count({ where: { userId, status: "SAVED" } }),
    prisma.application.count({ where: { userId, status: "APPLIED" } }),
    prisma.application.count({ where: { userId, status: "OA" } }),
    prisma.application.count({ where: { userId, status: "INTERVIEW" } }),
    prisma.application.count({ where: { userId, status: "OFFER" } }),
    prisma.application.count({ where: { userId, status: "REJECTED" } }),
  ]);

  return {
    totalApplications,
    savedCount,
    appliedCount,
    oaCount,
    interviewCount,
    offerCount,
    rejectedCount,
  };
};

const getMonthlyStats = async (userId) => {
  const rows = await prisma.application.groupBy({
    by: ["createdAt"],
    where: { userId },
    _count: {
      id: true,
    },
  });

  const monthMap = new Map();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  rows.forEach((row) => {
    const date = new Date(row.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const monthLabel = monthNames[date.getMonth()];

    if (!monthMap.has(key)) {
      monthMap.set(key, { month: monthLabel, applications: 0 });
    }

    monthMap.get(key).applications += row._count.id;
  });

  return Array.from(monthMap.values()).sort((a, b) => {
    const monthIndexA = monthNames.indexOf(a.month);
    const monthIndexB = monthNames.indexOf(b.month);
    return monthIndexA - monthIndexB;
  });
};

const getCompanyBreakdown = async (userId) => {
  const rows = await prisma.application.groupBy({
    by: ["companyName"],
    where: { userId },
    _count: {
      id: true,
    },
    orderBy: {
      companyName: "asc",
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
  getOverview,
  getMonthlyStats,
  getCompanyBreakdown,
};
