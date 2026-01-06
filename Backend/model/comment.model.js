import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required : true
    },
    post : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Post",
      required : true
    },
    parent : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Comment",
      default : null
      
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
