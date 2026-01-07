import express from "express";
const router = express.Router();
import {
  createComment,
  getAllComments,
  getComment,
} from "../controllers/comment.controller.js";
import Comment from "../models/comment.model.js";
import { protect } from "../Middleware/auth.js";

// Create a new comment
router.post("/", protect, createComment);

// Get all comments for a post (flat structure)

router.get("/post/:postId", protect, getAllComments);

// Get a single comment
router.get("/:id", protect, getComment);

export default router;
