import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import "./PostView.css";
import axios from "axios";

function PostView({ post }) {
  const [comments, setComments] = useState([]);
  const [commentTree, setCommentTree] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [post._id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/post/${post._id}`);
      const data = response.data;
      setComments(data);
      buildCommentTree(data);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  const buildCommentTree = (comments) => {
    const commentMap = {};
    const roots = [];

    // Create map of all comments
    comments.forEach((comment) => {
      commentMap[comment._id] = { ...comment, replies: [] };
    });

    // Build tree structure
    comments.forEach((comment) => {
      if (comment.parentId) {
        if (commentMap[comment.parentId]) {
          commentMap[comment.parentId].replies.push(commentMap[comment._id]);
        }
      } else {
        roots.push(commentMap[comment._id]);
      }
    });

    setCommentTree(roots);
  };

  const handleCommentAdded = () => {
    fetchComments();
    setReplyingTo(null);
  };

  return (
    <div className="post-view">
      <article className="post-content">
        <h1>{post.title}</h1>
        <div className="post-meta">
          Posted on {new Date(post.createdAt).toLocaleString()}
        </div>
        <div className="post-body">{post.content}</div>
      </article>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>

        <CommentForm
          postId={post._id}
          parentId={null}
          replyingTo={replyingTo}
          onCommentAdded={handleCommentAdded}
          onCancel={() => setReplyingTo(null)}
        />

        <CommentList
          comments={commentTree}
          postId={post._id}
          onReply={setReplyingTo}
          onCommentAdded={handleCommentAdded}
        />
      </section>
    </div>
  );
}

export default PostView;
