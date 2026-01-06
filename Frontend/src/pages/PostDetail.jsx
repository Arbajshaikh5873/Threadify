import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchPost } from "../store/slices/postSlice";
import {
  fetchComments,
  createComment,
  clearComments,
} from "../store/slices/commentSlice";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPost, loading: postLoading } = useSelector(
    (state) => state.posts
  );
  const { comments, loading: commentsLoading } = useSelector(
    (state) => state.comments
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPost(id));
    dispatch(fetchComments(id));

    return () => {
      dispatch(clearComments());
    };
  }, [id, dispatch]);

  const commentTree = useMemo(() => {
    const buildTree = (parentId = null) => {
      return comments
        .filter((comment) => comment.parent === parentId)
        .map((comment) => ({
          ...comment,
          replies: buildTree(comment._id),
        }));
    };
    return buildTree();
  }, [comments]);

  const handleCommentSubmit = async (message, parentId = null) => {
    await dispatch(createComment({ postId: id, message, parentId }));
  };

  if (postLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading post...</div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Post not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to all posts
      </Link>

      <article className="bg-white shadow rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {currentPost.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Posted by {currentPost.user?.name} •{" "}
          {new Date(currentPost.createdAt).toLocaleDateString()}
        </p>
        <div className="text-gray-700 whitespace-pre-wrap">
          {currentPost.body}
        </div>
      </article>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Comments ({comments.length})
        </h3>

        {user ? (
          <div className="mb-6">
            <CommentForm onSubmit={(message) => handleCommentSubmit(message)} />
          </div>
        ) : (
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <p className="text-gray-600">
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Sign in
              </Link>{" "}
              to leave a comment
            </p>
          </div>
        )}

        {commentsLoading && comments.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            Loading comments...
          </div>
        ) : commentTree.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          <div className="space-y-4">
            {commentTree.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                replies={comment.replies}
                onReply={handleCommentSubmit}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default PostDetail;
