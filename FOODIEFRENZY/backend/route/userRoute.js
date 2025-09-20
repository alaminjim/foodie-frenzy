import express from "express";

import {
  loginUser,
  registerUser,
  validateUser,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/register", validateUser, registerUser);
userRouter.post("/login", validateUser, loginUser);

export default userRouter;
