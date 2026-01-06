import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateComment, deleteComment } from "../store/slices/commentSlice";
import CommentForm from "./CommentForm";

function Comment({ comment, replies, onReply }) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const isOwner = user?.id === comment.user.id;

  const handleUpdate = async (message) => {
    await dispatch(updateComment({ postId, commentId: comment._id, message }));
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await dispatch(deleteComment({ postId, commentId: comment._id }));
    }
  };

  const handleReply = (message) => {
    onReply(message, comment._id);
    setIsReplying(false);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  };

  return (
    <div className="mb-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="font-semibold text-gray-900">
              {comment.user.name}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>

        {isEditing ? (
          <CommentForm
            initialValue={comment.message}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            autoFocus
          />
        ) : (
          <p className="text-gray-700 mb-3">{comment.message}</p>
        )}

        <div className="flex gap-3 text-sm">
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            {isReplying ? "Cancel Reply" : "Reply"}
          </button>

          {isOwner && (
            <>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                {isEditing ? "Cancel Edit" : "Edit"}
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {isReplying && (
        <div className="ml-8 mt-2">
          <CommentForm
            onSubmit={handleReply}
            onCancel={() => setIsReplying(false)}
            autoFocus
          />
        </div>
      )}

      {replies && replies.length > 0 && (
        <div className="ml-8 mt-2">
          {!areChildrenHidden ? (
            <>
              <button
                onClick={() => setAreChildrenHidden(true)}
                className="text-sm text-gray-500 hover:text-gray-700 mb-2"
              >
                Hide Replies
              </button>
              <div className="border-l-2 border-gray-300 pl-4 space-y-2">
                {replies.map((reply) => (
                  <Comment
                    key={reply._id}
                    comment={reply}
                    replies={reply.replies}
                    onReply={onReply}
                  />
                ))}
              </div>
            </>
          ) : (
            <button
              onClick={() => setAreChildrenHidden(false)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Show Replies ({replies.length})
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Comment;
