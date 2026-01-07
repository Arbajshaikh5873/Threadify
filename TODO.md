# TODO: Thread System Improvements

## Critical Bugs

- [ ] Fix missing auth token in createComment thunk (Frontend/src/redux/slices/commentSlice.js)
- [ ] Fix comment sorting in getComments controller for proper nested tree building (Backend/controllers/comment.controller.js)

## Missing Requirements

- [ ] Add updatedAt field to Comment model (Backend/models/comment.model.js)
- [ ] Update updateComment controller to set updatedAt and include in response (Backend/controllers/comment.controller.js)
- [ ] Add pagination to getPosts and getComments controllers (Backend/controllers/post.controller.js, Backend/controllers/comment.controller.js)
- [ ] Implement server-side comment tree building in getComments (Backend/controllers/comment.controller.js)
- [ ] Add basic rate limiting middleware for comment creation (Backend/middlewares/)
- [ ] Improve error handling in frontend (add retry logic, user-friendly messages)
- [ ] Add input sanitization for comments (prevent XSS)

## Bad Practices

- [ ] Centralize API_URL configuration
- [ ] Add optimistic updates for create/update actions in Redux slices
- [ ] Limit comment nesting depth (e.g., max 5 levels)

## Testing

- [ ] Test all fixes to ensure no regressions
