const { verifyToken } = require("../utils/tokenUtils.js");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(403)
      .json({ status: 403, message: "Access denied. No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ status: 400, message: "Invalid token" });
  }
};
