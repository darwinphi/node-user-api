import express from "express";
const app = express();
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import path from "path";
import cors from "cors";
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use("/auth", authRouter);
app.use("/users", usersRouter);

export default app;
