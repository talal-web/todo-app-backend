import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "./http/middlewares/index.middleware.js";
import helloRoutes from "./http/routes/hello.routes.js";
import todoRoutes from "./http/routes/todo.routes.js";
import authRoutes from "./http/routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/hello", helloRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

export default app;
