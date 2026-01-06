import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchAll",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/posts/${postId}/comments`);
      return data.comments;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch comments"
      );
    }
  }
);

export const createComment = createAsyncThunk(
  "comments/create",
  async ({ postId, message, parentId }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.post(
        `${API_URL}/posts/${postId}/comments`,
        { message, parentId },
        getAuthConfig(auth.token)
      );
      return data.comment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create comment"
      );
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ postId, commentId, message }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.put(
        `${API_URL}/posts/${postId}/comments/${commentId}`,
        { message },
        getAuthConfig(auth.token)
      );
      return { commentId, message: data.comment.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update comment"
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async ({ postId, commentId }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      await axios.delete(
        `${API_URL}/posts/${postId}/comments/${commentId}`,
        getAuthConfig(auth.token)
      );
      return commentId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const comment = state.comments.find(
          (c) => c._id === action.payload.commentId
        );
        if (comment) {
          comment.message = action.payload.message;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) =>
            comment._id !== action.payload && comment.parent !== action.payload
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
