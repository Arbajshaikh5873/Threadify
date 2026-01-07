import Comment from "../models/comment.model";

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
      createdAt: 1,
    });

    const commentMap = {};
    const rootComments = [];

    comments.forEach((comment) => {
      commentMap[comment._id] = {
        ...comment.toObject(),
        replies: [],
      };
    });

    comments.forEach((comment) => {
      if (comment.parentId) {
        const parentId = comment.parentId.toString();
        if (commentMap[parentId]) {
          commentMap[parentId].replies.push(commentMap[comment._id]);
        }
      } else {
        rootComments.push(commentMap[comment._id]);
      }
    });

    return res.status(200).json(rootComments);
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
