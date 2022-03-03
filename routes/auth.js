import express from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import "dotenv/config";
import { formatResponse, emailExists } from "../utils/user";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await emailExists(email);

  if (!user) {
    formatResponse(res, 400, "Invalid credentials", { email, password });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    formatResponse(res, 400, "Invalid credentials", { email, password });
    return;
  }
  const token = await JWT.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  formatResponse(res, 200, "Logged In Successfully", { token });
});

export default router;
