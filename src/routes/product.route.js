import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/upload.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByInventoryId,
  updateProduct,
} from "../controllers/product.controller.js";

const productRoutes = express.Router();

productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.get("/inventory/:id", getProductByInventoryId);
productRoutes.post("/", verifyToken, upload.single("image"), createProduct);
productRoutes.put("/:id", verifyToken, upload.single("image"), updateProduct);
productRoutes.delete("/:id", verifyToken, deleteProduct);


export default productRoutes;
