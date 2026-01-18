import express from "express";
import {
  getInventories,
  getInventory,
  createInventories,
  deleteInventory,
  updateInventory,
} from "../controllers/inventory.controller.js";
import veriftoken from "../middlewares/verifyToken.js";
import { validationUUID } from "../middlewares/idParams.js";

const inventoryRoutes = express.Router();

// inventoryRoutes.use(veriftoken)
inventoryRoutes.get("/", getInventories);
inventoryRoutes.get("/:id", validationUUID, getInventory);
inventoryRoutes.post("/", createInventories);
inventoryRoutes.put("/:id", validationUUID, updateInventory);
inventoryRoutes.delete("/:id", validationUUID, deleteInventory);

export default inventoryRoutes;
