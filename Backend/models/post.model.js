// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, "Title is required"],
//     trim: true,
//     minlength: [3, "Title must be at least 3 characters"],
//     maxlength: [200, "Title cannot exceed 200 characters"],
//   },
//   body: {
//     type: String,
//     required: [true, "Body is required"],
//     trim: true,
//     minlength: [10, "Body must be at least 10 characters"],
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// postSchema.index({ createdAt: -1 });
// postSchema.index({ user: 1 });

// const Post = mongoose.model("Post", postSchema);
// export default Post;

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
