import React, { useState, useEffect } from "react";
import PostView from "./components/PostView";
import CreatePost from "./components/CreatePost";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);

      // Auto-select first post if available
      if (data.length > 0 && !selectedPost) {
        setSelectedPost(data[0]);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setSelectedPost(newPost);
    setShowCreatePost(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Discussion Thread System</h1>
        <button
          className="create-post-btn"
          onClick={() => setShowCreatePost(!showCreatePost)}
        >
          {showCreatePost ? "Cancel" : "Create Post"}
        </button>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <h2>All Posts</h2>
          <div className="posts-list">
            {posts.length === 0 ? (
              <p className="no-posts">No posts yet</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className={`post-item ${
                    selectedPost?._id === post._id ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedPost(post);
                    setShowCreatePost(false);
                  }}
                >
                  <h3>{post.title}</h3>
                  <p className="post-preview">
                    {post.content.substring(0, 100)}...
                  </p>
                </div>
              ))
            )}
          </div>
        </aside>

        <main className="main-content">
          {showCreatePost ? (
            <CreatePost onPostCreated={handlePostCreated} />
          ) : selectedPost ? (
            <PostView post={selectedPost} />
          ) : (
            <div className="no-selection">
              <p>Select a post or create a new one</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
