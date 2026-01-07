import express from "express";
const router = express.Router();
import {
  createPost,
  getallPost,
  getPost,
} from "../controllers/post.controller.js";
import { protect } from "../Middleware/auth.js";

// Create a new post
router.post("/", protect, createPost);

// Get all posts
router.get("/", protect, getallPost);

// Get a single post by ID
router.get("/:id", protect, getPost);

export default router;
