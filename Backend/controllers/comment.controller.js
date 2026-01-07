import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const { postId, text, parentId } = req.body;

    if (!postId || !text) {
      return res.status(400).json({ error: "PostId and text are required" });
    }

    const comment = new Comment({
      postId,
      text,
      parentId: parentId || null,
    });

    await comment.save();
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all comments for a post (flat structure)
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
