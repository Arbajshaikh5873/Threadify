import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Post from "./Post";
import { Link } from "react-router-dom";

const PostList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/post`);
      const data = (await response).data;
      setPosts(data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1 className="error-msg">{error}</h1>;
  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <Link to={`/posts/${post._id}`}> {post.title} </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
