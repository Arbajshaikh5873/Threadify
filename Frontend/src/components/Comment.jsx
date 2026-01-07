import React, { useState } from "react";
import CommentForm from "./CommentForm";

function Comment({ comment, postId, onReply, onCommentAdded, depth = 0 }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplyAdded = () => {
    setShowReplyForm(false);
    onCommentAdded();
  };

  const getIndentColor = (depth) => {
    const colors = [
      "border-l-blue-400",
      "border-l-green-400",
      "border-l-purple-400",
      "border-l-pink-400",
      "border-l-yellow-400",
      "border-l-red-400",
    ];
    return colors[depth % colors.length];
  };

  return (
    <div
      className={`${
        depth > 0 ? `ml-8 pl-4 border-l-4 ${getIndentColor(depth - 1)}` : ""
      }`}
    >
      <div className="bg-gray-50 rounded-lg p-4 mb-4 hover:bg-gray-100 transition-colors">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {comment.text.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="font-semibold text-gray-900">
                Anonymous User
              </span>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
          {depth > 0 && (
            <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">
              Reply {depth}
            </span>
          )}
        </div>

        <div className="text-gray-700 mb-3 leading-relaxed whitespace-pre-wrap">
          {comment.text}
        </div>

        <button
          onClick={handleReplyClick}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          {showReplyForm ? "Cancel Reply" : "Reply"}
        </button>

        {showReplyForm && (
          <div className="mt-4 pl-4 border-l-2 border-blue-300">
            <div className="mb-2 text-sm text-gray-600 font-medium flex items-center gap-2">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
              Replying to comment
            </div>
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
        <div className="space-y-0">
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
