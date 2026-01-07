import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
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

// Index for efficient querying
commentSchema.index({ postId: 1 });
commentSchema.index({ parentId: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
