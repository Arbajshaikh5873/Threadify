
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

// Import Routes
import postRoutes from "./routes/post.router.js";
import commentRoutes from "./routes/comment.router.js";
import authRoutes from "./routes/user.router.js";
import connectDB from "./config/db.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();
// Use Routes
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
