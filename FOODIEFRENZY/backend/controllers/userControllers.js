import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import userModal from "../modals/userModal.js";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Validator
export const validateUser = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

// Register
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password, username } = req.body;

  try {
    // Firebase register
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // MongoDB save extra info
    const users = new userModal({
      uid: user.uid,
      email: user.email,
      username,
    });
    await users.save();

    // JWT token
    const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(201)
      .json({ message: "User registered", email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // JWT token
    const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(200)
      .json({ message: "User logged in", email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
