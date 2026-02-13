import express from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

// User routes
router.post("/", authMiddleware, authorize("user"), createOrder);
router.get("/my", authMiddleware, authorize("user"), getMyOrders);

// Admin routes
router.get("/", authMiddleware, authorize("admin"), getAllOrders);
router.put("/:id/status", authMiddleware, authorize("admin"), updateOrderStatus);

export default router;
