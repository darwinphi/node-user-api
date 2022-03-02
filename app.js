import express from "express";
const app = express();
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";

app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", usersRouter);

export default app;
