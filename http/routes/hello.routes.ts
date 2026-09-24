import { Router } from "express";
import { HelloController } from "../controllers/HelloController.js";
const router = Router();

router.get("/", HelloController);

export default router;
