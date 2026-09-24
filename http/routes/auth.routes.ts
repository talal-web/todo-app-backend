import { Router } from "express";

import { getRegister } from "../controllers/AuthController";

const router = Router();

router.post("/register", getRegister);

export default router;
