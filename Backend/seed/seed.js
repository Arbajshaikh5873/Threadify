import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

// Load environment variables
dotenv.config();

// Demo data
const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "password123",
  },
  {
    name: "Bob Wilson",
    email: "bob@example.com",
    password: "password123",
  },
];

const posts = [
  {
    title: "Welcome to Discussion Thread System",
    content: `Hello everyone! 👋

Welcome to our new discussion platform. This is a place where you can share your thoughts, ask questions, and engage in meaningful conversations.

Feel free to create posts on any topic you're interested in. We encourage respectful and constructive discussions.

Looking forward to seeing what topics you'll bring to the table!

Best regards,
The Team`,
  },
  {
    title: "Best Practices for React Development",
    content: `I've been working with React for a few years now, and I wanted to share some best practices that have helped me write better code:

1. Keep components small and focused
2. Use functional components with hooks
3. Implement proper error boundaries
4. Use PropTypes or TypeScript for type checking
5. Optimize performance with useMemo and useCallback
6. Follow a consistent folder structure

What are your favorite React best practices? Let's discuss!`,
  },
  {
    title: "How to Stay Productive While Working Remotely",
    content: `Remote work has become the norm for many of us. Here are some tips that have helped me stay productive:

• Set up a dedicated workspace
• Establish a routine and stick to it
• Take regular breaks
• Use time-blocking techniques
• Communicate clearly with your team
• Don't forget to exercise and take care of your health

What strategies work best for you? Share your tips below!`,
  },
  {
    title: "Learning Resources for Backend Development",
    content: `I'm compiling a list of great resources for learning backend development. Here's what I have so far:

Books:
- "Node.js Design Patterns" by Mario Casciaro
- "Building Microservices" by Sam Newman

Online Courses:
- Node.js - The Complete Guide (Udemy)
- MongoDB University courses

YouTube Channels:
- Traversy Media
- The Net Ninja
- Fireship

What other resources would you recommend?`,
  },
  {
    title: "Tips for Technical Interviews",
    content: `Technical interviews can be challenging. Here are some tips based on my experience:

Before the Interview:
1. Practice coding problems on LeetCode/HackerRank
2. Review data structures and algorithms
3. Study the company and their tech stack
4. Prepare questions to ask the interviewer

During the Interview:
1. Think out loud
2. Ask clarifying questions
3. Start with a brute force solution, then optimize
4. Test your code with examples
5. Stay calm and positive

Good luck to everyone preparing for interviews! What other tips do you have?`,
  },
];

const comments = [
  // Comments for first post
  {
    text: "This is awesome! Really excited to be part of this community.",
    parentId: null,
  },
  {
    text: "Thanks for creating this platform. Can't wait to start discussions!",
    parentId: null,
  },
  {
    text: "Welcome! What topics are you most interested in?",
    parentId: null, // This will be set as reply to first comment
  },

  // Comments for React post
  {
    text: "Great list! I would also add: Always lift state up only when necessary.",
    parentId: null,
  },
  {
    text: "Don't forget about code splitting and lazy loading for better performance!",
    parentId: null,
  },
  {
    text: "Absolutely! React.lazy() and Suspense are game changers.",
    parentId: null, // Reply to previous comment
  },
  {
    text: "What about using Context API vs Redux? When do you prefer each?",
    parentId: null,
  },

  // Comments for remote work post
  {
    text: "The Pomodoro Technique has been a lifesaver for me!",
    parentId: null,
  },
  {
    text: "I agree! 25 minutes of focused work followed by a 5-minute break works wonders.",
    parentId: null, // Reply to previous
  },
  {
    text: "Setting boundaries is crucial. I have a strict 'work hours only' policy.",
    parentId: null,
  },

  // Comments for learning resources post
  {
    text: "FreeCodeCamp is also an excellent free resource!",
    parentId: null,
  },
  {
    text: "Don't forget about official documentation. MDN for web and Node.js docs are great.",
    parentId: null,
  },

  // Comments for interview tips post
  {
    text: "Mock interviews really helped me. Practice with friends or use platforms like Pramp.",
    parentId: null,
  },
  {
    text: "Great tip! Also, don't forget to prepare your own questions for the interviewer.",
    parentId: null,
  },
  {
    text: "Understanding the company culture is just as important as technical skills.",
    parentId: null, // Reply
  },
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Clear existing data
const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log("🗑️  Cleared existing data");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    throw error;
  }
};

// Seed users
const seedUsers = async () => {
  try {
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);
    return createdUsers;
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    throw error;
  }
};

// Seed posts
const seedPosts = async (users) => {
  try {
    const postsWithUsers = posts.map((post, index) => ({
      ...post,
      userId: users[index % users.length]._id,
    }));

    const createdPosts = await Post.insertMany(postsWithUsers);
    console.log(`✅ Created ${createdPosts.length} posts`);
    return createdPosts;
  } catch (error) {
    console.error("❌ Error seeding posts:", error);
    throw error;
  }
};

// Seed comments
const seedComments = async (users, posts) => {
  try {
    const commentsData = [];
    let commentIndex = 0;

    // Post 1: 3 comments (1 top-level, 1 reply)
    commentsData.push({
      ...comments[commentIndex++],
      postId: posts[0]._id,
      userId: users[1]._id,
    });

    commentsData.push({
      ...comments[commentIndex++],
      postId: posts[0]._id,
      userId: users[2]._id,
    });

    // Save first batch to get IDs for replies
    const firstBatch = await Comment.insertMany(commentsData);

    // Add reply to first comment
    commentsData.push({
      text: "Welcome! What topics are you most interested in?",
      postId: posts[0]._id,
      userId: users[0]._id,
      parentId: firstBatch[0]._id,
    });

    // Post 2: React post - 4 comments with nested replies
    commentsData.push({
      ...comments[commentIndex++],
      postId: posts[1]._id,
      userId: users[2]._id,
    });

    commentsData.push({
      ...comments[commentIndex++],
      postId: posts[1]._id,
      userId: users[3]._id,
    });

    const secondBatch = await Comment.insertMany(commentsData);

    // Reply to the code splitting comment
    await Comment.create({
      text: "Absolutely! React.lazy() and Suspense are game changers.",
      postId: posts[1]._id,
      userId: users[0]._id,
      parentId: secondBatch[secondBatch.length - 1]._id,
    });

    await Comment.create({
      ...comments[commentIndex++],
      postId: posts[1]._id,
      userId: users[1]._id,
    });

    // Post 3: Remote work - 3 comments with reply
    const remoteComment1 = await Comment.create({
      ...comments[commentIndex++],
      postId: posts[2]._id,
      userId: users[0]._id,
    });

    await Comment.create({
      text: "I agree! 25 minutes of focused work followed by a 5-minute break works wonders.",
      postId: posts[2]._id,
      userId: users[1]._id,
      parentId: remoteComment1._id,
    });

    await Comment.create({
      ...comments[commentIndex++],
      postId: posts[2]._id,
      userId: users[3]._id,
    });

    // Post 4: Learning resources - 2 comments
    await Comment.create({
      ...comments[commentIndex++],
      postId: posts[3]._id,
      userId: users[2]._id,
    });

    await Comment.create({
      ...comments[commentIndex++],
      postId: posts[3]._id,
      userId: users[1]._id,
    });

    // Post 5: Interview tips - 3 comments with reply
    await Comment.create({
      ...comments[commentIndex++],
      postId: posts[4]._id,
      userId: users[3]._id,
    });

    const interviewComment = await Comment.create({
      ...comments[commentIndex++],
      postId: posts[4]._id,
      userId: users[0]._id,
    });

    await Comment.create({
      text: "Understanding the company culture is just as important as technical skills.",
      postId: posts[4]._id,
      userId: users[2]._id,
      parentId: interviewComment._id,
    });

    const totalComments = await Comment.countDocuments();
    console.log(
      `✅ Created ${totalComments} comments (including nested replies)`
    );
  } catch (error) {
    console.error("❌ Error seeding comments:", error);
    throw error;
  }
};

// Main seed function
const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...\n");

    // Connect to database
    await connectDB();

    // Clear existing data
    await clearDatabase();

    // Seed users
    const createdUsers = await seedUsers();

    // Seed posts
    const createdPosts = await seedPosts(createdUsers);

    // Seed comments
    await seedComments(createdUsers, createdPosts);

    console.log("\n✨ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Posts: ${createdPosts.length}`);
    console.log(`   Comments: ${await Comment.countDocuments()}`);
    console.log("\n🔐 All users have password: password123");
    console.log("\n👤 Demo users:");
    createdUsers.forEach((user) => {
      console.log(`   - ${user.email}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
