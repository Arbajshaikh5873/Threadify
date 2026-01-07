import React, { useState } from "react";
import "./CreatePost.css";
import axios from "axios";

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);

    try {
      const dataPost = { title, content };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        dataPost
      );

      const newPost = response.data;
      if (newPost) {
        setTitle("");
        setContent("");
        onPostCreated(newPost);
      }
    } catch (error) {
      console.log("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content..."
            rows="10"
            disabled={isSubmitting}
            required
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={!title.trim() || !content.trim() || isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
