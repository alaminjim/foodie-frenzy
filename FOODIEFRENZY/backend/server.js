import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./Config/db.js";
import userRouter from "./route/userRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import itemRouter from "./route/itemRoute.js";
import cartRouter from "./route/cartRoute.js";
import orderRouter from "./route/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware

app.use(
  cors({
    origin: (origin, callBack) => {
      const allowedOrigin = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
      ];
      if (!origin || allowedOrigin.includes(origin)) {
        callBack(null, true);
      } else {
        callBack(new Error("Not allowed by cors"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Database
connectDB();

// routes

app.use("/api/user", userRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/items", itemRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Foodie-frenzy ready to food delivery");
});

app.listen(port, () => {
  console.log(`Foodie-frenzy ready to food delivery port : ${port}`);
});
