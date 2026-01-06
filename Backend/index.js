import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utilities/db.js";

const app = express();
connectDB();
app.get("/", (req, res) => {
  res.send("server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
