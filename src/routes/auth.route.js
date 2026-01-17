// buat route untuk auth
import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

app.post("/login", login);



