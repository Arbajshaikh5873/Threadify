import React, { useState } from "react";
import CommentForm from "./CommentForm";
import "./Comment.css";

function Comment({ comment, postId, onReply, onCommentAdded, depth = 0 }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplyAdded = () => {
    setShowReplyForm(false);
    onCommentAdded();
  };

  return (
    <div
      className="comment-container"
      style={{ marginLeft: `${depth * 24}px` }}
    >
      <div className="comment">
        <div className="comment-header">
          <span className="comment-author">Anonymous User</span>
          <span className="comment-date">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>

        <div className="comment-text">{comment.text}</div>

        <button className="reply-button" onClick={handleReplyClick}>
          {showReplyForm ? "Cancel Reply" : "Reply"}
        </button>

        {showReplyForm && (
          <div className="reply-form-container">
            <div className="replying-to-indicator">Replying to comment</div>
            <CommentForm
              postId={postId}
              parentId={comment._id}
              onCommentAdded={handleReplyAdded}
              onCancel={() => setShowReplyForm(false)}
            />
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              postId={postId}
              onReply={onReply}
              onCommentAdded={onCommentAdded}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
