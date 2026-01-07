// import Post from "../models/post.model.js";

// export const createPost = async (req, res) => {
//   try {
//     const { title, content } = req.body;

//     if (!title || !content) {
//       return res.status(400).json({ error: "Title and content are required" });
//     }

//     const post = new Post({
//       title,
//       content,
//       userId: req.userId,
//     });

//     await post.save();
//     return res.status(200).json(post);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export const getallPost = async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ createdAt: -1 });
//     return res.json(posts);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export const getPost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     return res.json(post);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export const updatePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     if (post.userId.toString() !== req.userId) {
//       return res
//         .status(403)
//         .json({ error: "Not authorized to update this post" });
//     }

//     const { title, content } = req.body;
//     post.title = title || post.title;
//     post.content = content || post.content;

//     await post.save();
//     return res.json(post);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export const deletePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     if (post.userId.toString() !== req.userId) {
//       return res
//         .status(403)
//         .json({ error: "Not authorized to delete this post" });
//     }

//     await post.deleteOne();
//     return res.json({ message: "Post deleted successfully" });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const post = new Post({
      title,
      content,
      userId: req.userId,
    });

    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getallPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this post" });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    post.title = title;
    post.content = content;

    await post.save();
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this post" });
    }

    // Delete all comments associated with this post
    await Comment.deleteMany({ postId: post._id });

    // Delete the post
    await post.deleteOne();

    return res.json({ message: "Post and all comments deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
