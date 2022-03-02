import express from "express";
const router = express.Router();
import { profile } from "../database.js";
import authMiddleware from "../middleware/auth.js";

router.get("/", authMiddleware, (req, res) => {
  res.json(profile);
});

export default router;
