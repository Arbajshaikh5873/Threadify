import express from "express";
import {
  createPost,
  getPosts,
  getPost,
} from "../controllers/post.controller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(protect, createPost).get(getPosts);

router.route("/:id").get(getPost);

export default router;
