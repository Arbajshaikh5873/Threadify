import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./utilities/db.js";
import router from "./router/post.router.js";

const app = express();
app.use(cors());
connectDB();
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
