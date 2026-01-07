import express from "express";
const router = express.Router();
import {
  createPost,
  getallPost,
  getPost,
} from "../controllers/post.controller.js";

// Create a new post
router.post("/", createPost);

// Get all posts
router.get("/", getallPost);

// Get a single post by ID
router.get("/:id", getPost);

export default router;
