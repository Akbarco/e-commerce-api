import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

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

app.use("/api/v1/auth", authRoutes);






export default app;
