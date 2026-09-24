import { Router } from "express";

import { TodoController } from "../controllers/TodoController.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

const controller = new TodoController();

router.use(requireAuth);

router.post("/", controller.create.bind(controller));

router.get("/", controller.getAll.bind(controller));

router.get("/:id", controller.getOne.bind(controller));

router.patch("/:id", controller.update.bind(controller));

router.delete("/:id", controller.delete.bind(controller));

export default router;
