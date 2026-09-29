import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { ApiError } from "../errors/ApiError.js";

interface JwtPayload {
  sub: string;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new ApiError(500, "JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (typeof decoded.sub !== "string") {
      throw new ApiError(401, "Invalid token");
    }

    req.user = {
      id: decoded.sub,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, "Invalid or expired token"));
    }

    next(error);
  }
}
