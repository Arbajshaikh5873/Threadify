import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    minlength: [1, "Message cannot be empty"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ parent: 1 });
commentSchema.index({ user: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
