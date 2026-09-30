import { Router } from "express";
import { container } from "../../src/infrastructure/di/container.js";
import { AuthController } from "../controllers/AuthController.js";
import { AuthService } from "../../src/application/auth/AuthService.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

const authService = container.resolve(AuthService);
const authController = new AuthController(authService);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", requireAuth, authController.me);

export default router;
