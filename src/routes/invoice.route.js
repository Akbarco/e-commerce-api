import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  checkout,
  getAllInvoice,
  getInvoiceById,
  getInvoiceByUsermail,
} from "../controllers/invoice.controller.js";

const invoiceRoutes = express.Router();

invoiceRoutes.use(verifyToken);
invoiceRoutes.get("/", getAllInvoice);
invoiceRoutes.get("/:id", getInvoiceById);
invoiceRoutes.get("/user/:email", getInvoiceByUsermail);
invoiceRoutes.post("/checkout", checkout);

export default invoiceRoutes;
