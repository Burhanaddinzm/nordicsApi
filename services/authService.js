const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../utils/tokenUtils");

const prisma = new PrismaClient();

const registerUser = async (userData) => {
  const { username, email, password } = userData;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;

    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Datetime stuff
  const now = new Date();
  const utcNow = new Date(now.toUTCString());
  const azTime = new Date(utcNow.getTime() + 4 * 60 * 60 * 1000);

  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
      createdAt: azTime,
    },
  });

  return user;
};

const authenticateUser = async (userData) => {
  const { email, password } = userData;

  const user = await getUserByEmail(email);
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;

    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;

    throw error;
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
