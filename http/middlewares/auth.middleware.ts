import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";

import auth from "../../src/infrastructure/auth/auth.js";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
        [key: string]: unknown;
      };
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.user = session.user;

    next();
  } catch (error) {
    next(error);
  }
}
