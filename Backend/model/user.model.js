import mongoose from "mongoose";
import Comment from "./comment.model.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// when user record is about to delete -> delete all the comments user have made
// This is called cascade delete.
userSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()._id;

  await Comment.deleteMany({ user: userId });

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
