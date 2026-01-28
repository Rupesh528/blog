import express from "express";
import authMiddleware from "./auth.js";
import { prisma } from "../prisma/lib/prisma.js";

const router = express.Router();

// CREATE BLOG
router.post("/", authMiddleware, async (req, res) => {
  const { title, content, published = false } = req.body;

  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      published,
      authorId: req.userId
    }
  });

  res.json({ id: blog.id });
});

// UPDATE BLOG (secure)
router.put("/", authMiddleware, async (req, res) => {
  const { id, title, content, published } = req.body;

  const result = await prisma.blog.updateMany({
    where: {
      id,
      authorId: req.userId
    },
    data: { title, content, published }
  });

  if (result.count === 0) {
    return res.status(403).json({ message: "Not allowed" });
  }

  res.json({ message: "Blog updated" });
});

// GET ALL BLOGS
router.get("/bulk", async (req, res) => {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: { name: true }
      }
    }
  });

  res.json({ blogs });
});

// GET BLOG BY ID
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const blog = await prisma.blog.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      author: {
        select: { name: true }
      }
    }
  });

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json({ blog });
});

export default router;
