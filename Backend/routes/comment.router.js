import express from "express";
const router = express.Router();
import {
  createComment,
  getAllComments,
  getComment,
} from "../controllers/comment.controller.js";

// Create a new comment
router.post("/", createComment);

// Get all comments for a post (flat structure)

// router.get("/post/:postId",
//   async (req, res) => {
//   try {
//     const comments = await Comment.find({ postId: req.params.postId }).sort({
//       createdAt: 1,
//     });

//     return res.status(200).json(comments);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

router.get("/post/:postId", getAllComments);

// Get a single comment
router.get("/:id", getComment);

export default router;
