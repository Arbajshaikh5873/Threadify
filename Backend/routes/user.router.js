import express from "express";
import {
  login,
  register,
  deleteAccount,
} from "../controllers/user.controller.js";
import { protect } from "../Middleware/auth.js";

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Delete account route (protected)
router.delete("/delete-account", protect, deleteAccount);

export default router;
