import express from "express";
const router = express.Router();
import { getAllUsers, createUser } from "../repo/user.js";

router.get("/", async (_req, res) => {
  const users = await getAllUsers();
  res.json({ users });
});

router.post("/create", async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    address,
    postcode,
    contactNumber,
    username,
    password,
    isAdmin,
  } = req.body;
  const newUser = createUser({
    email,
    firstName,
    lastName,
    address,
    postcode,
    contactNumber,
    username,
    password,
    isAdmin,
  });

  res.status(201).json({ newUser });
});

export default router;
