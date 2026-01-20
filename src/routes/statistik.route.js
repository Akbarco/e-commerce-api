import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { getSingle, getRange } from "../controllers/statistik.controller.js";

const statistikRoutes = express.Router();

statistikRoutes.use(verifyToken);
statistikRoutes.get("/range", getRange);
statistikRoutes.get("/single", getSingle);

export default statistikRoutes;
