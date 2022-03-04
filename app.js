import express from "express";
const app = express();
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import authMiddleware from "./middleware/auth.js";
import path from "path";
import cors from "cors";
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.get("/", authMiddleware, (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});
app.use("/auth", authRouter);
app.use("/users", usersRouter);

export default app;
