import type { Request, Response, NextFunction } from "express";

import { AuthService } from "../../src/application/auth/AuthService";
import { ApiResponse } from "../response/ApiResponse";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.register(req.body);

      return ApiResponse.success(
        res,
        201,
        "User registered successfully",
        user,
      );
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login(email, password);

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
        path: "/",
      });

      return ApiResponse.success(res, 200, "Login successful", {
        user: result.user,
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return ApiResponse.success(res, 200, "Logout successful");
    } catch (error) {
      next(error);
    }
  };
  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.getCurrentUser(req.user!.id);

      return ApiResponse.success(
        res,
        200,
        "Current user retrieved successfully",
        user,
      );
    } catch (error) {
      next(error);
    }
  };
}
