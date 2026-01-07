import express from "express";
const router = express.Router();
import {
  createPost,
  getallPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { protect } from "../Middleware/auth.js";

// Create a new post
router.post("/", protect, createPost);

// Get all posts
router.get("/", protect, getallPost);

// Get a single post by ID
router.get("/:id", protect, getPost);

// Update a post
router.put("/:id", protect, updatePost);

// Delete a post
router.delete("/:id", protect, deletePost);

export default router;
