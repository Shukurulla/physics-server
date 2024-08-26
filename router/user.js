import express from "express";
import userModel from "../models/user.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../service/token.js";
import authenticateJWT from "../middleware/middleware.js";
const router = express.Router();

router.post("/create-user", cors(), async (req, res) => {
  const { username, fullName, age, password, job, school } = req.body;
  if (!username || !fullName || !age || !password || !job || !school) {
    res.json({ msg: "Bad request", status: "Error" });
  } else {
    const condidate = await userModel.findOne({ username });
    if (condidate) {
      res.json({ msg: "Username already exist", status: "Error" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    const token = generateJWTToken(user._id);
    if (token) {
      res.json({ user, token });
    }
  }
});
router.post("/login", cors(), async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json({ msg: "Bad request", status: "Error" });
  } else {
    const user = await userModel.findOne({ username });
    const regeneratePassword = await bcrypt.hash(password, 10);
    const token = generateJWTToken(user._id);
    if (token) {
      res.json({ user, token });
    }
  }
});
router.get("/profile", authenticateJWT, (req, res) => {
  res.json(req.user);
});
router.post("/test", authenticateJWT, async (req, res) => {
  await userModel.findByIdAndUpdate(req.body.userId, req.body);
  const user = await userModel.findOne({ _id: req.body.userId });
  res.json({ user });
});
router.post("/setting", authenticateJWT, async (req, res) => {
  const { userId, username, fullName, age, job, school, picture } = req.body;
  if (
    !userId ||
    !username ||
    !fullName ||
    !age ||
    !job ||
    !school ||
    !picture
  ) {
    res.json({ msg: "Bad request", status: "Error" });
  } else {
    await userModel.findByIdAndUpdate(req.body.userId, req.body);
    const user = await userModel.findOne({ _id: req.body.userId });
    res.json({ user });
  }
});

export default router;
