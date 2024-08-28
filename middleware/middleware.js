import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      try {
        const foundUser = await userModel.findById(user.userId);
        if (!foundUser) {
          return res.sendStatus(404);
        }
        req.user = foundUser;
        next();
      } catch (error) {
        res.status(500).json({ message: "Serverda xato yuz berdi" });
      }
    });
  } else {
    res.sendStatus(401);
  }
};

export default authenticateJWT;
