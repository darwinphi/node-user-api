import express from "express";
const router = express.Router();
import { param, check, validationResult } from "express-validator";
import { emailExists, idExists, formatResponse } from "../utils/user.js";
import {
  getAllUsers,
  createUser,
  deleteUser,
  deleteUsers,
  editUser,
} from "../repo/user.js";

const validations = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password must be more than 5 characters").isLength({
    min: 5,
  }),
  check("email").custom((value) => {
    return emailExists(value).then((user) => {
      if (user) {
        return Promise.reject("Email already in use");
      }
    });
  }),
];
const errors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return formatResponse(res, 400, "Errors", errors.array());
  } else {
    return false;
  }
};

router.get("/", async (_req, res) => {
  const users = await getAllUsers();
  formatResponse(res, 200, "Ok", users);
});

router.post("/create", validations, async (req, res) => {
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

  if (!errors(req, res)) {
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
  }
});

const deleteValidations = [
  param("id").custom((value) => {
    if (isNaN(value)) {
      return Promise.reject("Invalid format");
    } else {
      return idExists(Number(value)).then((user) => {
        if (!user) {
          return Promise.reject("User does not exists");
        }
      });
    }
  }),
];
router.delete("/delete/:id", deleteValidations, async (req, res) => {
  const { id } = req.params;

  if (!errors(req, res)) {
    const deletedUser = await deleteUser(Number(id));
    formatResponse(res, 200, "User deleted", deletedUser);
  }
});

router.post("/delete", async (req, res) => {
  const { ids } = req.body;
  const userIds = ids.map((id) => {
    return { id: Number(id) };
  });
  console.log(ids);
  const deletedUsers = await deleteUsers(userIds);
  formatResponse(res, 200, "Users deleted", deletedUsers);
});

router.put("/edit", async (req, res) => {
  const userData = req.body;
  const editedUser = await editUser(userData);
  formatResponse(res, 200, "User edited", editedUser);
});

export default router;
