import express from "express";
const router = express.Router();
import {
  createComment,
  deleteComment,
  getAllComments,
  getComment,
  updateComment,
} from "../controllers/comment.controller.js";
import { protect } from "../Middleware/auth.js";

// Create a new comment
router.post("/", protect, createComment);

// Get all comments for a post 

router.get("/post/:postId", protect, getAllComments);

// Get a single comment
router.get("/:id", protect, getComment);

// Update a comment
router.put("/:id", protect, updateComment);

// Delete a comment
router.delete("/:id", protect, deleteComment);

export default router;
