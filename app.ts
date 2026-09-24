import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import errorMiddleware from "./http/middlewares/error.middleware.js";
import helloRoutes from "./http/routes/hello.routes.js";
import todoRoutes from "./http/routes/todo.routes.js";
import auth from "./src/infrastructure/auth/auth.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Better Auth must come before express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/hello", helloRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorMiddleware);

export default app;
