import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "../model/user.model.js";
import Post from "../model/post.model.js";
import Comment from "../model/comment.model.js";

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");

    // Clean DB
    await User.deleteMany();
    await Post.deleteMany();
    await Comment.deleteMany();
    console.log("Database cleared");

    // Create Users
    const users = await User.insertMany([
      { name: "Arbaj" },
      { name: "Amit" },
      { name: "Rahul" },
    ]);

    // Create Post
    const post = await Post.create({
      title: "Is MERN stack good for real-world apps?",
      body: "Let's discuss how MERN performs in production systems.",
    });

    // Create Comments (nested)
    const c1 = await Comment.create({
      message: "Yes, MERN is great for startups",
      user: users[0]._id,
      post: post._id,
    });

    const c2 = await Comment.create({
      message: "React makes UI development fast",
      user: users[1]._id,
      post: post._id,
      parent: c1._id,
    });

    const c3 = await Comment.create({
      message: "MongoDB scales very well",
      user: users[2]._id,
      post: post._id,
      parent: c2._id,
    });

    const c4 = await Comment.create({
      message: "Node.js handles concurrent users nicely",
      user: users[1]._id,
      post: post._id,
    });

    console.log("Seed data inserted successfully 🚀");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
