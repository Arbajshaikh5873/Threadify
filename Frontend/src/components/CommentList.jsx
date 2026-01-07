import React from "react";
import Comment from "./Comment";
import "./CommentList.css";

function CommentList({ comments, postId, onReply, onCommentAdded, depth = 0 }) {
  if (!comments || comments.length === 0) {
    return depth === 0 ? (
      <div className="no-comments">
        No comments yet. Be the first to comment!
      </div>
    ) : null;
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          postId={postId}
          onReply={onReply}
          onCommentAdded={onCommentAdded}
          depth={depth}
        />
      ))}
    </div>
  );
}

export default CommentList;
