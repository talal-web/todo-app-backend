import { Router } from "express";

import { TodoController } from "../controllers/TodoController.js";
import { requireAuth } from "../middlewares/index.middleware.js";

const router = Router();

const controller = new TodoController();

// Protect all todo routes
router.use(requireAuth);

router.post("/", controller.create);

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.patch("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;
