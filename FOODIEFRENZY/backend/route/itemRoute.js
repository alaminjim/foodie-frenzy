import express from "express";
import multer from "multer";
import {
  createItem,
  deleteItem,
  getItem,
} from "../controllers/itemsControllers.js";

const itemRouter = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Routes
itemRouter.post("/", upload.single("image"), createItem);
itemRouter.get("/", getItem);
itemRouter.delete("/:id", deleteItem);

export default itemRouter;
