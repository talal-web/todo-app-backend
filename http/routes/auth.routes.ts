import { Router } from "express";
import { container } from "../../src/infrastructure/di/container.js";
import { AuthController } from "../controllers/AuthController.js";
import { AuthService } from "../../src/application/auth/AuthService.js";
import { requireAuth } from "../middlewares/index.middleware.js";
import { requireGuest } from "../middlewares/index.middleware.js";

const router = Router();

const authService = container.resolve(AuthService);
const authController = new AuthController(authService);

router.post("/register", requireGuest, authController.register);
router.post("/login", requireGuest, authController.login);
router.post("/logout", authController.logout);
router.get("/me", requireAuth, authController.me);

export default router;
