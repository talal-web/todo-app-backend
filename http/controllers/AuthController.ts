import type { Request, Response } from "express";

import { container } from "tsyringe";

import { AuthService } from "../../src/application/auth/AuthService.js";

import { ApiResponse } from "../response/ApiResponse.js";

const authService = container.resolve(AuthService);
// const userRepo = new UserRepository();
// const authService = new AuthService(userRepo);

export const getRegister = async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);

  return ApiResponse.success(res, 201, "User registered successfully", user);
};
