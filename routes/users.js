import express from "express";
const router = express.Router();
import { getAllUsers } from "../repo/user.js";

router.get("/", async (_req, res) => {
  const users = await getAllUsers();
  res.json({ users });
});

// router.post("/create", async (req, res) => {
//   const {
//     email,
//     first_name,
//     last_name,
//     address,
//     postcode,
//     contact_number,
//     username,
//     password,
//   } = req.body;
//   const newUser = await user.create({
//     data: {
//       email,
//       first_name,
//       last_name,
//       address,
//       postcode,
//       contact_number,
//       username,
//       password,
//     },
//   });

//   res.json(newUser);
// });

export default router;
