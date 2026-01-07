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
      userId: req.userId,
      parentId: parentId || null,
    });

    await comment.save();

    // Populate user info before sending response
    await comment.populate("userId", "name email");

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all comments for a post (flat structure with user info)
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this comment" });
    }

    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Comment text is required" });
    }

    comment.text = text.trim();
    await comment.save();
    await comment.populate("userId", "name email");

    return res.json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this comment" });
    }

    // Delete all child comments (replies) recursively
    const deleteReplies = async (parentId) => {
      const replies = await Comment.find({ parentId });
      for (const reply of replies) {
        await deleteReplies(reply._id);
        await reply.deleteOne();
      }
    };

    await deleteReplies(comment._id);
    await comment.deleteOne();

    return res.json({
      message: "Comment and all replies deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
