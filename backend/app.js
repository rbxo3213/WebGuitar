// backend/app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./routes/users");
const musicRoutes = require("./routes/music");
const postsRoutes = require("./routes/posts");
const sheetsRoutes = require("./routes/sheets");

// API 라우트를 먼저 선언
app.use("/api/users", userRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/sheets", sheetsRoutes);

// 그 뒤 정적 파일 제공
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });
