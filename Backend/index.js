// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import { errorHandler } from "./middlewares/error.js";
// import authRoutes from "./routes/auth.router.js";
// import postRoutes from "./routes/post.router.js";
// import commentRoutes from "./routes/comment.router.js";

// dotenv.config();

// connectDB();

// const app = express();

// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/posts/:id/comments", commentRoutes);

// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

// Import Routes
import postRoutes from "./routes/post.router.js";
import commentRoutes from "./routes/comment.router.js";
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

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
