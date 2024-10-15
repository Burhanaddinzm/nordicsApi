const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const generateToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    },
    secretKey,
    { expiresIn: "1h" }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  generateToken,
  verifyToken,
};
