import express from "express";
const router = express.Router();
import { check, validationResult } from "express-validator";
import { users } from "../database.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const secret = "HWQXTVdJWQ3SDJ6Lkb45XFGAWpAu4vPk";

const validations = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password must be more than 4 characters").isLength({
    min: 5,
  }),
];

const checkValidations = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
};

const emailExists = (email, res) => {
  const user = users.find((user) => user.email === email);
  if (user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Email already exists",
        },
      ],
    });
  } else {
    return false;
  }
};

router.post("/signup", validations, async (req, res) => {
  const { email, password } = req.body;

  checkValidations(req, res);

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!emailExists(email, res)) {
    users.push({
      email,
      password: hashedPassword,
    });

    const token = await JWT.sign({ email }, secret, { expiresIn: "1d" });

    return res.json({
      token,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
    });
  } else {
    const token = await JWT.sign({ email }, secret, { expiresIn: "1d" });

    return res.json({
      token,
    });
  }
});

router.get("/users", (req, res) => {
  res.json(users);
});

export default router;
