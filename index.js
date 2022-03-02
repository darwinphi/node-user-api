import express from "express";
const server = express();
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";

server.use(express.json());
server.use("/auth", authRouter);
server.use("/profile", usersRouter);

server.listen(5000, () => console.log("🚀 Listening on port 5000"));
