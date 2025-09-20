import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./Config/db.js";
import userRouter from "./route/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;

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

app.get("/", (req, res) => {
  res.send("Foodie-frenzy ready to food delivery");
});

app.listen(port, () => {
  console.log(`Foodie-frenzy ready to food delivery port : ${port}`);
});
