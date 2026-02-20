import express from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // <--- import multer
import { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProductById, 
    deleteProductById 
} from "../controllers/productController.js";

const router = express.Router();

// Get all products & Create product (with image)
router.route("/")
  .get(getAllProducts)
  .post(authMiddleware, authorize("admin"), upload.single("image"), createProduct);

// Get, update, delete product by ID
router.route("/:id")
  .get(getProductById)
  .put(authMiddleware, authorize("admin"), upload.single("image"), updateProductById)
  .delete(authMiddleware, authorize("admin"), deleteProductById);

export default router;