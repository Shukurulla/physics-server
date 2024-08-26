import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("database connected");
});

app.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

app.listen(3001, () => {
  console.log("server has ben started on port 3001");
});
