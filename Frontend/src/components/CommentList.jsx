import React from "react";
import Comment from "./Comment";

function CommentList({ comments, postId, onReply, onCommentAdded, depth = 0 }) {
  if (!comments || comments.length === 0) {
    return depth === 0 ? (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p className="text-gray-600 font-medium text-lg mb-1">
          No comments yet
        </p>
        <p className="text-gray-500 text-sm">
          Be the first to share your thoughts!
        </p>
      </div>
    ) : null;
  }

  return (
    <div className="space-y-0">
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
