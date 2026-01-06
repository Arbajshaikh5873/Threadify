import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and body",
      });
    }

    const post = await Post.create({
      title,
      body,
      user: req.user.id,
    });

    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "name"
    );

    res.status(201).json({
      success: true,
      post: populatedPost,
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .select("_id title createdAt")
      .sort({ createdAt: -1 })
      .populate("user", "name");

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", "name");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};
