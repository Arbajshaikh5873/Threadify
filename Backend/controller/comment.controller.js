import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res, next) => {
  try {
    const { message, parentId } = req.body;
    const { id: postId } = req.params;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment || parentComment.post.toString() !== postId) {
        return res.status(400).json({
          success: false,
          message: "Invalid parent comment",
        });
      }
    }

    const comment = await Comment.create({
      message,
      user: req.user.id,
      post: postId,
      parent: parentId || null,
    });

    const populatedComment = await Comment.findById(comment._id).populate(
      "user",
      "name"
    );

    res.status(201).json({
      success: true,
      comment: {
        _id: populatedComment._id,
        message: populatedComment.message,
        parent: populatedComment.parent,
        user: {
          id: populatedComment.user._id,
          name: populatedComment.user.name,
        },
        createdAt: populatedComment.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { id: postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate("user", "name");

    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      message: comment.message,
      parent: comment.parent,
      user: {
        id: comment.user._id,
        name: comment.user.name,
      },
      createdAt: comment.createdAt,
    }));

    res.status(200).json({
      success: true,
      count: formattedComments.length,
      comments: formattedComments,
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to edit this comment",
      });
    }

    comment.message = message;
    await comment.save();

    res.status(200).json({
      success: true,
      comment: {
        message: comment.message,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this comment",
      });
    }

    await Comment.deleteMany({ parent: commentId });
    await comment.deleteOne();

    res.status(200).json({
      success: true,
      comment: {
        id: commentId,
      },
    });
  } catch (error) {
    next(error);
  }
};
