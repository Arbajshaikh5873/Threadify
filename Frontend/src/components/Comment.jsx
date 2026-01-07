import React, { useState } from "react";
import CommentForm from "./CommentForm";
import axios from "axios";

function Comment({
  comment,
  postId,
  onReply,
  onCommentAdded,
  onCommentDeleted,
  depth = 0,
  allComments = [],
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("curr"));
  const isOwner = currentUser && comment.userId?._id === currentUser._id;

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
    setIsEditing(false);
  };

  const handleReplyAdded = () => {
    setShowReplyForm(false);
    onCommentAdded();
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowReplyForm(false);
    setEditText(comment.text);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(comment.text);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) return;

    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/comments/${comment._id}`,
        { text: editText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsEditing(false);
      onCommentAdded(); // Refresh comments
    } catch (error) {
      console.error("Error updating comment:", error);
      alert(error.response?.data?.error || "Failed to update comment");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onCommentDeleted) {
        onCommentDeleted();
      } else {
        onCommentAdded(); // Refresh comments
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert(error.response?.data?.error || "Failed to delete comment");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
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

  const getParentComment = () => {
    if (!comment?.parentId || !allComments || allComments.length === 0)
      return null;
    return allComments.find((c) => c._id === comment.parentId);
  };

  const parentComment = getParentComment();
  const userName = comment?.userId?.name || "Anonymous User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div
      className={`${
        depth > 0 ? `ml-8 pl-4 border-l-4 ${getIndentColor(depth - 1)}` : ""
      }`}
    >
      <div className="bg-gray-50 rounded-lg p-4 mb-4 hover:bg-gray-100 transition-colors">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md flex-shrink-0">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {userName}
                  {isOwner && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      You
                    </span>
                  )}
                </span>
                {parentComment && (
                  <span className="text-xs text-gray-500 flex items-center gap-1 flex-wrap">
                    <svg
                      className="w-3 h-3 flex-shrink-0"
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
                    <span>replied to</span>
                    <span className="font-medium text-gray-700">
                      {parentComment.userId?.name || "Anonymous User"}'s comment
                    </span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <svg
                  className="w-3 h-3 flex-shrink-0"
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
            <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded flex-shrink-0">
              Reply {depth}
            </span>
          )}
        </div>

        {/* Comment Text or Edit Form */}
        {isEditing ? (
          <div className="ml-13 mb-3">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 resize-none"
              rows="3"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveEdit}
                disabled={!editText.trim() || isSaving}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-700 mb-3 leading-relaxed whitespace-pre-wrap ml-13">
            {comment.text}
          </div>
        )}

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex items-center gap-4 ml-13">
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

            {isOwner && (
              <>
                <button
                  onClick={handleEditClick}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>

                <button
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Delete Comment?
              </h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this comment? This will also
                delete all replies to this comment. This action cannot be
                undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-4 ml-13 pl-4 border-l-2 border-blue-300">
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
              Replying to {userName}'s comment
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

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-0">
          {comment.replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              postId={postId}
              onReply={onReply}
              onCommentAdded={onCommentAdded}
              onCommentDeleted={onCommentDeleted}
              depth={depth + 1}
              allComments={allComments}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
