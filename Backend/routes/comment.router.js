import express from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router({ mergeParams: true });

router.route("/").post(protect, createComment).get(getComments);

router
  .route("/:commentId")
  .put(protect, updateComment)
  .delete(protect, deleteComment);

export default router;
