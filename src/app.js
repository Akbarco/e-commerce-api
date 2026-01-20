import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import { globalErrorHandler } from "./middlewares/errorHandling.js";
import inventoryRoutes from "./routes/inventory.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import invoiceRoutes from "./routes/invoice.route.js";
import statistikRoutes from "./routes/statistik.route.js";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API running");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/inventories", inventoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
// app.use("/api/invoice", invoiceRoutes);
// app.use("/api/statistik", statistikRoutes);

app.use(globalErrorHandler);

export default app;
