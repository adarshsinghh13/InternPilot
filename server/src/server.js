require("dotenv").config();

console.log("JWT Secret:", process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const authMiddleware = require("./middleware/authMiddleware");
const resumeRoutes = require("./routes/resumeRoutes");

app.get(
  "/api/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      user: req.user,
    });
  }
);

app.use(cors());
app.use(express.json());
app.use("/api/resume", resumeRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "InternPilot API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});