const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY || "aoinapvmpo@pokfas&*1mvkla";
const expires = process.env.JWT_EXPIRE || "7d";
exports.register = async (req, res, next) => {
  try {
    // validate data
    const { username, email, password, confirmPassword } = req.body;
    const hashedPassword = await bcrypt.hash(password, 15);
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
    res.status(201).json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "invalid credential" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credential" });
    }
    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: expires,
    });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
