import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import PostList from "./components/PostList";
import Post from "./components/Post";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
