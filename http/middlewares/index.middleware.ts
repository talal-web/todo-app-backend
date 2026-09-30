// src/http/middleware/index.ts
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ApiError } from "../errors/ApiError.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../errors/errorMessages.js";

interface JwtPayload {
  sub: string;
}

/* -------------------------------------------------------------------------- */
/* requireAuth: only logged-in users                                          */
/* -------------------------------------------------------------------------- */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGES.AUTH.UNAUTHORIZED,
      );
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES.SERVER.JWT_SECRET_NOT_CONFIGURED,
      );
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (typeof decoded.sub !== "string") {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGES.AUTH.INVALID_TOKEN,
      );
    }

    req.user = { id: decoded.sub };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(
        new ApiError(
          HTTP_STATUS.UNAUTHORIZED,
          ERROR_MESSAGES.AUTH.INVALID_OR_EXPIRED_TOKEN,
        ),
      );
    }

    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/* requireGuest: only logged-out users (login / register)                     */
/* -------------------------------------------------------------------------- */
export function requireGuest(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  // No cookie: user is a guest, continue
  if (!token) {
    return next();
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return next(
      new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES.SERVER.JWT_SECRET_NOT_CONFIGURED,
      ),
    );
  }

  try {
    jwt.verify(token, secret);
  } catch {
    // Invalid or expired token: treat as a guest so they can log in again
    return next();
  }

  // Valid token: user is already logged in
  return next(
    new ApiError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.AUTH.ALREADY_LOGGED_IN),
  );
}

/* -------------------------------------------------------------------------- */
/* errorMiddleware: must be registered LAST in app.ts                         */
/* -------------------------------------------------------------------------- */
export function errorMiddleware(
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
      ...(error.errors !== undefined && { errors: error.errors }),
    });
  }

  // Unexpected error
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
