import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import { globalErrorHandler } from "./middlewares/errorHandling.js";

const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/auth", authRoutes);

app.use(globalErrorHandler);

export default app;
