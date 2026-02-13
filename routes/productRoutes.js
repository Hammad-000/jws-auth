import express from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";

import { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProductById, 
    deleteProductById 
} from "../controllers/productController.js";

const router = express.Router();

// Public route: get all products
router.get("/", getAllProducts);

// Admin only routes
router.post("/", authMiddleware, authorize("admin"), createProduct);
router.put("/:id", authMiddleware, authorize("admin"), updateProductById);
router.delete("/:id", authMiddleware, authorize("admin"), deleteProductById);
router.get("/:id", authMiddleware, authorize("admin"), getProductById);

export default router;
