import mongoose from "mongoose";
import Post from "../model/post.model.js";

async function getPosts(req, res) {
  try {
    const posts = await Post.find({});
    return res.status(200).json(posts);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `getPosts method error...${error.message}` });
  }
}

export default getPosts;
