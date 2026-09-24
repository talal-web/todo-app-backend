import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/ApiError.js";

export default function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // Our custom application error
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.errors !== undefined && {
        errors: error.errors,
      }),
    });
  }

  // Unexpected error
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
