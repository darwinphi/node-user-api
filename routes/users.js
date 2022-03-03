import express from "express";
const router = express.Router();
import { getAllUsers, createUser, deleteUser } from "../repo/user.js";

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
  const newUser = await createUser({
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

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(Number(id));

  console.log(deletedUser);

  res.status(200).json(deletedUser);
});

export default router;
