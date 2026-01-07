import React, { useState } from "react";
import "./CommentForm.css";
import axios from "axios";

function CommentForm({ postId, parentId, onCommentAdded, onCancel }) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    setIsSubmitting(true);

    try {
      const newComment = {
        postId,
        text,
        parentId,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comments`,
        newComment
      );

      const newPost = await response.data;
      if (newPost) {
        setText("");
        onCommentAdded();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={parentId ? "Write your reply..." : "Add a comment..."}
        rows="3"
        disabled={isSubmitting}
      />
      <div className="comment-form-actions">
        <button
          type="submit"
          className="submit-button"
          disabled={!text.trim() || isSubmitting}
        >
          {isSubmitting
            ? "Posting..."
            : parentId
            ? "Post Reply"
            : "Post Comment"}
        </button>
        {parentId && onCancel && (
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default CommentForm;
