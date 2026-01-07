# 💬 Discussion Thread System

A full-stack discussion forum application with nested comments, similar to Reddit or Medium. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://threadify-rouge.vercel.app/)
[![Backend API](https://img.shields.io/badge/Backend-API-blue?style=for-the-badge&logo=render)](https://threadify-9ln0.onrender.com)

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express.js-4.18-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</p>

---

## 🌟 Features

### Core Functionality
- ✅ **User Authentication** - Secure JWT-based auth with bcrypt password hashing
- ✅ **Create Posts** - Rich text posts with title and content
- ✅ **Nested Comments** - Unlimited depth comment threading (like Reddit)
- ✅ **Real-time Updates** - Instant UI updates after actions
- ✅ **Edit & Delete** - Full CRUD operations on posts and comments
- ✅ **Account Management** - Delete account with cascade deletion

### User Experience
- 🎨 **Modern UI** - Beautiful Tailwind CSS design with gradient effects
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- 🔒 **Protected Routes** - Secure authentication middleware
- ⚡ **Fast Performance** - Optimized API calls and state management
- 🎭 **Visual Feedback** - Loading states, error handling, and success messages

### Technical Features
- 🔐 **Secure Authentication** - JWT tokens with 7-day expiry
- 🗄️ **Database Indexing** - Optimized MongoDB queries
- 🌲 **Comment Threading** - Efficient tree-building algorithm
- 🎯 **Ownership Validation** - Only owners can edit/delete their content
- 📊 **RESTful API** - Well-structured backend endpoints

---

## 🚀 Live Demo

### 🌐 **[View Live Application](https://threadify-rouge.vercel.app/)**

**Demo Credentials:**
- Email: `demo@example.com`
- Password: `demo123`

Or create your own account to test full functionality!

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management (useState, useEffect)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### DevOps
- **Render.com** - Backend hosting
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Database hosting
- **Git & GitHub** - Version control

---

## 📋 System Architecture

```
┌─────────────────┐      HTTPS       ┌─────────────────┐
│                 │◄────────────────► │                 │
│  React Frontend │                   │  Express API    │
│   (Vercel)      │    JSON/JWT       │   (Render)      │
│                 │                   │                 │
└─────────────────┘                   └────────┬────────┘
                                               │
                                               │ Mongoose
                                               ▼
                                      ┌─────────────────┐
                                      │   MongoDB       │
                                      │   (Atlas)       │
                                      └─────────────────┘
```

---

## 💾 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Post Model
```javascript
{
  title: String,
  content: String,
  userId: ObjectId (ref: User),
  createdAt: Date
}
```

### Comment Model
```javascript
{
  text: String,
  postId: ObjectId (ref: Post),
  userId: ObjectId (ref: User),
  parentId: ObjectId (ref: Comment, nullable),
  createdAt: Date
}
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js v18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Git installed

### 📥 Installation

1. **Clone the repository**
```bash
git clone [https://github.com/yourusername/discussion-thread-system.git](https://github.com/Arbajshaikh5873/Threadify)
cd Threadify
```

2. **Setup Backend**
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/discussion-thread
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
NODE_ENV=development
EOF

# Seed database with demo data
npm run seed

# Start backend server
npm run dev
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000
EOF

# Start frontend
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### 🧪 Demo Data

After running `npm run seed`, you can login with:
- **Email:** `john@example.com` | **Password:** `password123`
- **Email:** `jane@example.com` | **Password:** `password123`
- **Email:** `alice@example.com` | **Password:** `password123`

---

## 📁 Project Structure

```
discussion-thread-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── comment.controller.js # Comment CRUD logic
│   │   ├── post.controller.js    # Post CRUD logic
│   │   └── user.controller.js    # Auth logic
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── models/
│   │   ├── comment.model.js      # Comment schema
│   │   ├── post.model.js         # Post schema
│   │   └── user.model.js         # User schema
│   ├── routes/
│   │   ├── comment.router.js     # Comment endpoints
│   │   ├── post.router.js        # Post endpoints
│   │   └── user.router.js        # Auth endpoints
│   ├── seed/
│   │   └── seed.js               # Database seeding
│   ├── index.js                  # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Comment.jsx           # Comment component
│   │   │   ├── CommentForm.jsx       # Comment input form
│   │   │   ├── CommentList.jsx       # Comment tree renderer
│   │   │   ├── CreatePost.jsx        # Post creation form
│   │   │   ├── PostView.jsx          # Post display
│   │   │   └── AccountSettings.jsx   # User settings
│   │   ├── pages/
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Register.jsx          # Registration page
│   │   │   └── Logout.jsx            # Logout page
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
DELETE /api/auth/delete-account  # Delete account (protected)
```

### Posts
```
GET    /api/posts                # Get all posts (protected)
POST   /api/posts                # Create post (protected)
GET    /api/posts/:id            # Get single post (protected)
PUT    /api/posts/:id            # Update post (protected)
DELETE /api/posts/:id            # Delete post (protected)
```

### Comments
```
GET    /api/comments/post/:postId  # Get comments for post (protected)
POST   /api/comments               # Create comment (protected)
GET    /api/comments/:id           # Get single comment (protected)
PUT    /api/comments/:id           # Update comment (protected)
DELETE /api/comments/:id           # Delete comment (protected)
```

---

## 🎯 Key Implementation Details

### Nested Comments Algorithm
The application implements a tree-building algorithm to convert flat comment data into a nested structure:

```javascript
const buildCommentTree = (comments) => {
  const commentMap = {};
  const roots = [];

  // Create map of all comments
  comments.forEach(comment => {
    commentMap[comment._id] = { ...comment, replies: [] };
  });

  // Build tree structure
  comments.forEach(comment => {
    if (comment.parentId && commentMap[comment.parentId]) {
      commentMap[comment.parentId].replies.push(commentMap[comment._id]);
    } else {
      roots.push(commentMap[comment._id]);
    }
  });

  return roots;
};
```

### Authentication Flow
1. User registers → Password hashed with bcrypt (10 salt rounds)
2. User logs in → JWT token generated (7-day expiry)
3. Token stored in localStorage
4. Protected routes check token validity via middleware
5. User ID extracted from token for ownership validation

### Security Features
- ✅ Password hashing with bcrypt
- ✅ JWT token expiration
- ✅ Protected API routes
- ✅ Ownership validation (can only edit/delete own content)
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variables for sensitive data

---

## 🎨 UI/UX Highlights

- **Gradient Designs** - Modern gradients for visual appeal
- **Smooth Animations** - Hover effects and transitions
- **Loading States** - Spinners for async operations
- **Error Handling** - User-friendly error messages
- **Confirmation Modals** - Prevent accidental deletions
- **Responsive Layout** - Mobile-first design approach
- **Visual Hierarchy** - Clear content organization
- **Accessibility** - Semantic HTML and ARIA labels

---

## 🧪 Testing

### Manual Testing Checklist
- [x] User registration with validation
- [x] User login with JWT token
- [x] Create post as authenticated user
- [x] Edit own post
- [x] Delete own post (with comments cascade)
- [x] Add comment to post
- [x] Reply to comment (nested)
- [x] Edit own comment
- [x] Delete own comment (with replies cascade)
- [x] Account deletion (with posts & comments cascade)
- [x] Ownership validation (cannot edit others' content)
- [x] Logout functionality

### Test User Flow
```
1. Register → 2. Login → 3. Create Post → 
4. Add Comment → 5. Reply to Comment → 
6. Edit Comment → 7. Delete Comment → 
8. Edit Post → 9. Delete Post → 10. Logout
```

---

## 🚀 Deployment

This application is deployed using free-tier services:

- **Frontend:** Vercel (Unlimited projects, 100GB bandwidth)
- **Backend:** Render.com (750 hours/month)
- **Database:** MongoDB Atlas (512MB storage)


## 📝 Future Enhancements

- [ ] User profile pages with avatars
- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Search and filter posts
- [ ] Pagination for posts and comments
- [ ] Vote/like system for posts and comments
- [ ] Rich text editor (Markdown support)
- [ ] Image upload for posts
- [ ] Real-time notifications with WebSockets
- [ ] Sort comments by date/popularity
- [ ] Report inappropriate content
- [ ] Admin dashboard
- [ ] Dark mode toggle
- [ ] Export posts as PDF


## 👤 Author

**Arbaj Shaikh**

- [@GitHub](https://github.com/Arbajshaikh5873)
- [LinkedIn](https://www.linkedin.com/in/arbaj-shaikh-b9a8b7228/)
- [Portfolio](https://arbaj-portfolio-iota.vercel.app/)
- Email: arbajshaikh5873@gmail.com

---

## 🙏 Acknowledgments

- Design inspiration from Reddit and Medium
- Icons from [Heroicons](https://heroicons.com)
- Deployed using [Render](https://render.com) and [Vercel](https://vercel.com)
- Database hosted on [MongoDB Atlas](https://mongodb.com/atlas)


<p align="center">
  Made with ❤️ and lots of ☕
</p>

<p align="center">
  <a href="#-discussion-thread-system">Back to Top ⬆️</a>
</p>
