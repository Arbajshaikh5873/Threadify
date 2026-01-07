import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Post ID is required"],
  },
  text: {
    type: String,
    required: [true, "Comment text is required"],
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for efficient querying
commentSchema.index({ postId: 1, createdAt: -1 });
commentSchema.index({ parentId: 1 });
commentSchema.index({ userId: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
