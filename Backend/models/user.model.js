import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Post from "./post.model.js";
import Comment from "./comment.model.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//  Hashing password using Bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

// Cascade delete hook
userSchema.pre("remove", async function (next) {
  await Post.deleteMany({ userId: this._id });
  await Comment.deleteMany({ userId: this._id });
  next();
});

export default User;
