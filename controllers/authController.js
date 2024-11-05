const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await authService.authenticateUser(req.body);

    res.header("Authorization", `Bearer ${token}`).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
