// import React, { useState, useEffect } from "react";
// import PostView from "./components/PostView";
// import CreatePost from "./components/CreatePost";
// import axios from "axios";
// import Register from "./pages/Register";
// import LogIn from "./pages/Login";
// import Logout from "./pages/Logout";

// function App() {
//   const [posts, setPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showPage, setShowPage] = useState("login");
//   const [curr, setCurr] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("curr");

//     if (token && userData) {
//       setCurr(JSON.parse(userData));
//       setIsLoggedIn(true);
//       setShowPage("main");
//     } else {
//       setIsLoggedIn(false);
//       setShowPage("login");
//     }
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     if (curr && isLoggedIn) {
//       fetchPosts();
//     }
//   }, [curr, isLoggedIn]);

//   const fetchPosts = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/posts`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setPosts(response.data);

//       if (response.data.length > 0 && !selectedPost) {
//         setSelectedPost(response.data[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       if (error.response?.status === 401) {
//         handleLogout();
//       }
//     }
//   };

//   const handlePostCreated = (newPost) => {
//     setPosts([newPost, ...posts]);
//     setSelectedPost(newPost);
//     setShowCreatePost(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("curr");
//     setCurr(null);
//     setIsLoggedIn(false);
//     setShowPage("logout");
//     setPosts([]);
//     setSelectedPost(null);
//   };

//   const handleLoginSuccess = (userData) => {
//     setCurr(userData);
//     setIsLoggedIn(true);
//     setShowPage("main");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-xl text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if (showPage === "register") {
//     return (
//       <>
//         <nav className="bg-white shadow-lg sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 Discussion Thread System
//               </h1>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowPage("login")}
//                   className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
//                 >
//                   Log in
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>
//         <Register onRegisterSuccess={() => setShowPage("login")} />
//       </>
//     );
//   }

//   if (showPage === "login") {
//     return (
//       <>
//         <nav className="bg-white shadow-lg sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 Discussion Thread System
//               </h1>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowPage("register")}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>
//         <LogIn onLoginSuccess={handleLoginSuccess} />
//       </>
//     );
//   }

//   if (showPage === "logout") {
//     return (
//       <>
//         <nav className="bg-white shadow-lg sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 Discussion Thread System
//               </h1>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowPage("login")}
//                   className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
//                 >
//                   Log in
//                 </button>
//                 <button
//                   onClick={() => setShowPage("register")}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>
//         <Logout />
//       </>
//     );
//   }

//   if (!curr || !isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//         <nav className="bg-white shadow-lg sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 Discussion Thread System
//               </h1>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowPage("register")}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
//                 >
//                   Register
//                 </button>
//                 <button
//                   onClick={() => setShowPage("login")}
//                   className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Log in
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>
//         <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               Welcome to Discussion Thread System
//             </h2>
//             <p className="text-gray-600 mb-8">
//               Please login or register to continue
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <nav className="bg-white shadow-lg sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Discussion Thread System
//             </h1>
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-600">
//                 Welcome, {curr?.name || "User"}
//               </span>
//               <button
//                 onClick={() => setShowCreatePost(!showCreatePost)}
//                 className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
//               >
//                 {showCreatePost ? "Cancel" : "Create Post"}
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
//               >
//                 Log out
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex gap-6">
//           {/* Sidebar */}
//           <div className="w-80 flex-shrink-0">
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
//                 <h2 className="text-xl font-bold text-white">All Posts</h2>
//               </div>
//               <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
//                 {posts.length === 0 ? (
//                   <div className="p-8 text-center text-gray-500">
//                     <svg
//                       className="w-16 h-16 mx-auto mb-4 text-gray-300"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                       />
//                     </svg>
//                     <p className="font-medium">No posts yet</p>
//                     <p className="text-sm mt-1">Create your first post!</p>
//                   </div>
//                 ) : (
//                   posts.map((post) => (
//                     <div
//                       key={post._id}
//                       onClick={() => {
//                         setSelectedPost(post);
//                         setShowCreatePost(false);
//                       }}
//                       className={`p-4 border-b border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${
//                         selectedPost?._id === post._id
//                           ? "bg-blue-50 border-l-4 border-l-blue-600"
//                           : ""
//                       }`}
//                     >
//                       <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
//                         {post.title}
//                       </h3>
//                       <p className="text-sm text-gray-600 line-clamp-2">
//                         {post.content.substring(0, 100)}...
//                       </p>
//                       <p className="text-xs text-gray-400 mt-2">
//                         {new Date(post.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {showCreatePost ? (
//               <CreatePost onPostCreated={handlePostCreated} />
//             ) : selectedPost ? (
//               <PostView post={selectedPost} />
//             ) : (
//               <div className="bg-white rounded-xl shadow-lg p-12 text-center">
//                 <svg
//                   className="w-20 h-20 mx-auto mb-4 text-gray-300"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
//                   />
//                 </svg>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Select a Post
//                 </h2>
//                 <p className="text-gray-600">
//                   Choose a post from the sidebar or create a new one
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import PostView from "./components/PostView";
import CreatePost from "./components/CreatePost";
import AccountSettings from "./components/AccountSettings";
import axios from "axios";
import Register from "./pages/Register";
import LogIn from "./pages/Login";
import Logout from "./pages/Logout";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPage, setShowPage] = useState("login");
  const [curr, setCurr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("curr");

    if (token && userData) {
      setCurr(JSON.parse(userData));
      setIsLoggedIn(true);
      setShowPage("main");
    } else {
      setIsLoggedIn(false);
      setShowPage("login");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (curr && isLoggedIn) {
      fetchPosts();
    }
  }, [curr, isLoggedIn]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data);

      if (response.data.length > 0 && !selectedPost) {
        setSelectedPost(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setSelectedPost(newPost);
    setShowCreatePost(false);
  };

  const handlePostDeleted = (postId) => {
    const updatedPosts = posts.filter((p) => p._id !== postId);
    setPosts(updatedPosts);
    setSelectedPost(updatedPosts.length > 0 ? updatedPosts[0] : null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("curr");
    setCurr(null);
    setIsLoggedIn(false);
    setShowPage("logout");
    setPosts([]);
    setSelectedPost(null);
  };

  const handleLoginSuccess = (userData) => {
    setCurr(userData);
    setIsLoggedIn(true);
    setShowPage("main");
  };

  const handleAccountDeleted = () => {
    setShowAccountSettings(false);
    handleLogout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (showPage === "register") {
    return (
      <>
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Discussion Thread System
              </h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPage("login")}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </nav>
        <Register onRegisterSuccess={() => setShowPage("login")} />
      </>
    );
  }

  if (showPage === "login") {
    return (
      <>
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Discussion Thread System
              </h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPage("register")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </nav>
        <LogIn onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  if (showPage === "logout") {
    return (
      <>
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Discussion Thread System
              </h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPage("login")}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => setShowPage("register")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </nav>
        <Logout />
      </>
    );
  }

  if (!curr || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Discussion Thread System
              </h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPage("register")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Register
                </button>
                <button
                  onClick={() => setShowPage("login")}
                  className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to Discussion Thread System
            </h2>
            <p className="text-gray-600 mb-8">
              Please login or register to continue
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Discussion Thread System
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAccountSettings(true)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                title="Account Settings"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="hidden sm:inline">{curr?.name || "User"}</span>
              </button>
              <button
                onClick={() => setShowCreatePost(!showCreatePost)}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                {showCreatePost ? "Cancel" : "Create Post"}
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showAccountSettings && (
        <AccountSettings
          user={curr}
          onAccountDeleted={handleAccountDeleted}
          onClose={() => setShowAccountSettings(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">All Posts</h2>
              </div>
              <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                {posts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="font-medium">No posts yet</p>
                    <p className="text-sm mt-1">Create your first post!</p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <div
                      key={post._id}
                      onClick={() => {
                        setSelectedPost(post);
                        setShowCreatePost(false);
                      }}
                      className={`p-4 border-b border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${
                        selectedPost?._id === post._id
                          ? "bg-blue-50 border-l-4 border-l-blue-600"
                          : ""
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {post.content.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {showCreatePost ? (
              <CreatePost onPostCreated={handlePostCreated} />
            ) : selectedPost ? (
              <PostView post={selectedPost} onPostDeleted={handlePostDeleted} />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <svg
                  className="w-20 h-20 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Select a Post
                </h2>
                <p className="text-gray-600">
                  Choose a post from the sidebar or create a new one
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
