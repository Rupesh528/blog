import express from "express";
import zod from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config.js";
import { prisma } from "../prisma/lib/prisma.js";

const router = express.Router();

const signupSchema = zod.object({
  name: zod.string().optional(),
  username: zod.string().email(),
  password: zod.string()
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string()
});

// SIGNUP
router.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const { name, username, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: { username }
  });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name: name || "", username, password: hashedPassword }
  });

  const token = jwt.sign(
    { userId: user.id },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

// SIGNIN
router.post("/signin", async (req, res) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const { username, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { userId: user.id },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

export default router;
