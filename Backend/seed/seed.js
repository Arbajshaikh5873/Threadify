import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");

    await Comment.deleteMany();
    await Post.deleteMany();
    await User.deleteMany();
    console.log("Database cleared...");

    const users = await User.create([
      {
        name: "Kyle",
        email: "kyle@example.com",
        password: "password123",
      },
      {
        name: "Sarah",
        email: "sarah@example.com",
        password: "password123",
      },
      {
        name: "John",
        email: "john@example.com",
        password: "password123",
      },
    ]);
    console.log("Users created...");

    const posts = await Post.create([
      {
        title: "Introduction to React Hooks",
        body: "React Hooks are a powerful feature that allow you to use state and other React features without writing a class. In this post, we will explore useState, useEffect, and custom hooks.",
        user: users[0]._id,
      },
      {
        title: "Understanding MongoDB Indexing",
        body: "Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must perform a collection scan, i.e., scan every document in a collection. This post covers best practices for indexing.",
        user: users[1]._id,
      },
      {
        title: "Building RESTful APIs with Express",
        body: "Express is a minimal and flexible Node.js web application framework. This guide will walk you through creating a production-ready REST API with proper routing, middleware, and error handling.",
        user: users[0]._id,
      },
    ]);
    console.log("Posts created...");

    const comments = await Comment.create([
      {
        message:
          "Great explanation! This really helped me understand hooks better.",
        user: users[1]._id,
        post: posts[0]._id,
        parent: null,
      },
      {
        message:
          "Thanks! I am glad it was helpful. Which hook are you finding most useful?",
        user: users[0]._id,
        post: posts[0]._id,
        parent: null,
      },
      {
        message:
          "Definitely useState and useEffect. They cover most of my use cases.",
        user: users[1]._id,
        post: posts[0]._id,
        parent: null,
      },
      {
        message: "Do you have any tips for optimizing MongoDB queries?",
        user: users[2]._id,
        post: posts[1]._id,
        parent: null,
      },
      {
        message:
          "Yes! Always use compound indexes for queries with multiple fields.",
        user: users[1]._id,
        post: posts[1]._id,
        parent: null,
      },
      {
        message: "That makes sense. What about indexing arrays?",
        user: users[2]._id,
        post: posts[1]._id,
        parent: null,
      },
      {
        message: "Multikey indexes are your friend for array fields!",
        user: users[1]._id,
        post: posts[1]._id,
        parent: null,
      },
      {
        message: "This is exactly what I was looking for. Thank you!",
        user: users[0]._id,
        post: posts[2]._id,
        parent: null,
      },
      {
        message: "Could you cover authentication in a future post?",
        user: users[2]._id,
        post: posts[2]._id,
        parent: null,
      },
      {
        message: "Absolutely! JWT authentication will be my next topic.",
        user: users[0]._id,
        post: posts[2]._id,
        parent: null,
      },
    ]);

    const nestedComments = await Comment.create([
      {
        message:
          "I would add useContext to that list. It is incredibly useful for state management.",
        user: users[2]._id,
        post: posts[0]._id,
        parent: comments[2]._id,
      },
      {
        message: "Good point! useContext is great for avoiding prop drilling.",
        user: users[0]._id,
        post: posts[0]._id,
        parent: comments[2]._id,
      },
      {
        message: "Thank you for the tip! I will try that approach.",
        user: users[2]._id,
        post: posts[1]._id,
        parent: comments[4]._id,
      },
      {
        message:
          "Also consider using the explain() method to analyze query performance.",
        user: users[0]._id,
        post: posts[1]._id,
        parent: comments[4]._id,
      },
      {
        message: "Looking forward to it! Will you also cover refresh tokens?",
        user: users[1]._id,
        post: posts[2]._id,
        parent: comments[9]._id,
      },
    ]);

    console.log("Comments created with nested replies...");
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
