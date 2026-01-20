import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { getAllCart, addToCart } from "../controllers/cart.controller.js";


const cartRoutes = express.Router();

cartRoutes.use(verifyToken);

cartRoutes.get("/", getAllCart);
cartRoutes.post("/", addToCart);

export default cartRoutes;
