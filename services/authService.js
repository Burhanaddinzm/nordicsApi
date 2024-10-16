const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../utils/tokenUtils");
const { getAzTime } = require("../utils/dateTimeUtils");
const { throwErrorWithStatusCode } = require("../utils/errorUtils");

const prisma = new PrismaClient();

const registerUser = async (userData) => {
  const { username, email, password } = userData;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throwErrorWithStatusCode(400, "User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
      createdAt: getAzTime(),
    },
  });

  return user;
};

const authenticateUser = async (userData) => {
  const { email, password } = userData;

  const user = await getUserByEmail(email);
  if (!user) {
    throwErrorWithStatusCode(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throwErrorWithStatusCode(401, "Invalid credentials");
  }

  return generateToken(user);
};

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email: email } });
};

module.exports = {
  registerUser,
  authenticateUser,
  getUserByEmail,
};
