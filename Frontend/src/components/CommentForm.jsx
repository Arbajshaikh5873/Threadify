import { useState } from "react";

function CommentForm({
  onSubmit,
  onCancel,
  initialValue = "",
  autoFocus = false,
}) {
  const [message, setMessage] = useState(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await onSubmit(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoFocus={autoFocus}
        rows="3"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Write your comment..."
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
        >
          Post
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition text-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default CommentForm;
