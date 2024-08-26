import express from "express";
import userModel from "../models/user.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../service/token.js";
const router = express.Router();

router.post("/create-user", cors(), async (req, res) => {
  const { username, fullName, age, password, job, school } = req.body;
  if (!username || !fullName || !age || !password || !job || !school) {
    res.json({ msg: "Bad request", status: "Error" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    const token = generateJWTToken(user._id);
    console.log(token);
  }
});
