import React, { useState, useEffect } from "react";
import PostView from "./components/PostView";
import CreatePost from "./components/CreatePost";
import "./App.css";
import axios from "axios";
import Register from "./pages/Register";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPage, setShowPage] = useState("register");
  const [curr, setCurr] = useState();

  useEffect(() => {
    setCurr(JSON.parse(localStorage.getItem("curr")));
  }, []);

  useEffect(() => {
    if (curr) {
      fetchPosts();
    }
  }, [curr]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts`
      );
      const data = await response.data;
      console.log("data inside fetchPosts", data);

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
  if (showPage == "register") {
    return <Register />;
  }
  // if loggedIn then proceed otherwise not
  if (!curr) {
    return (
      <div className="app">
        {/* Navbar Started */}
        <header className="app-header">
          <h1>Discussion Thread System</h1>

          {/* register */}
          <button
            className="create-post-btn"
            onClick={() => {
              setShowPage("register");

              console.log(`${showPage} clicked`);
            }}
          >
            Register
          </button>

          {/* LogIn or LogOut btn */}
          <button
            className="create-post-btn"
            onClick={() => {
              if (!isLoggedIn) {
                setShowPage("logIn");
              } else if (isLoggedIn) {
                setShowPage("logout");
              }
              setIsLoggedIn(!isLoggedIn);
            }}
          >
            {!isLoggedIn ? "Log in" : "Log out"}
          </button>
        </header>
        <div className="app-container">
          <h1>need to login/register first</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Navbar Started */}
      <header className="app-header">
        <h1>Discussion Thread System</h1>
        <button
          className="create-post-btn"
          onClick={() => setShowCreatePost(!showCreatePost)}
        >
          {showCreatePost ? "Cancel" : "Create Post"}
        </button>

        {/* LogIn or LogOut btn */}
        <button
          className="create-post-btn"
          onClick={() => {
            if (!isLoggedIn) {
              setShowPage("logIn");
            } else if (isLoggedIn) {
              setShowPage("logout");
            }
            setIsLoggedIn(!isLoggedIn);
          }}
        >
          {!isLoggedIn ? "Log in" : "Log out"}
        </button>
        {/* register */}
        <button
          className="create-post-btn"
          onClick={() => {
            setShowPage("register");
          }}
        >
          Register
        </button>
      </header>

      {/* Navbar End */}

      {/* If not curr user */}
      <div className="app-container">
        {/* Sidebar started */}
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

        {/* Sidebar End */}

        {/* Main Page */}
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

        {/* Main Page end */}
      </div>
    </div>
  );
}

export default App;
