import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import { requireAuth } from "../middlewares/auth.middleware";

import { AuthService } from "../../src/application/auth/AuthService";
import { UserRepository } from "../../src/infrastructure/database/repositories/UserRepository";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get("/me", requireAuth, authController.me);

export default router;
