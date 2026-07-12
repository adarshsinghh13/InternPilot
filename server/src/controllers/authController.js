const asyncHandler = require("../utils/asyncHandler");
const { registerUser, loginUser } = require("../services/authService");

const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json(result);
});

module.exports = {
  register,
  login,
};