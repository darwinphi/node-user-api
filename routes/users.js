import express from "express";
const router = express.Router();
import { formatResponse } from "../utils/user.js";
import {
  getAllUsers,
  createUser,
  deleteUser,
  deleteUsers,
  editUser,
} from "../repo/user.js";

router.get("/", async (_req, res) => {
  const users = await getAllUsers();
  formatResponse(res, 200, "Ok", users);
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

  formatResponse(res, 201, "User Created", newUser);
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(Number(id));
  formatResponse(res, 200, "User deleted", deletedUser);
});

router.delete("/delete", async (req, res) => {
  const { ids } = req.body;
  const userIds = ids.map((id) => {
    return { id: Number(id) };
  });
  const deletedUsers = await deleteUsers(userIds);
  formatResponse(res, 200, "Users deleted", deletedUsers);
});

router.put("/edit", async (req, res) => {
  const userData = req.body;
  const editedUser = await editUser(userData);
  // res.status(200).json(editedUser);
  formatResponse(res, 200, "User edited", editedUser);
});

export default router;
