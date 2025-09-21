import express from "express";
import {
  confirmPayment,
  createOrder,
  getAllOrders,
  getOrderById,
  getOrders,
  updateAnyOrder,
  updateOrder,
} from "../controllers/orderControllers.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.get("/getall", getAllOrders);
orderRouter.get("/getall/:id", updateAnyOrder);

// protect rest of routes using middleware

orderRouter.use(authMiddleware);

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.get("/confirm", confirmPayment);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);

export default orderRouter;
