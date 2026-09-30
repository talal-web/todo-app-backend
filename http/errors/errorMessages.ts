export const ERROR_MESSAGES = {
  TODO: {
    TITLE_REQUIRED: "Todo title is required",
    TITLE_EMPTY: "Todo title cannot be empty",
  },
  USER: {
    NOT_FOUND: "User not found",
  },
  AUTH: {
    UNAUTHORIZED: "Unauthorized",
    INVALID_TOKEN: "Invalid token",
    INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token",
    PASSWORD_TOO_SHORT: "Password must be at least 8 characters",
    EMAIL_ALREADY_REGISTERED: "Email already registered",
    INVALID_CREDENTIALS: "Invalid email or password",
    ALREADY_LOGGED_IN: "You are already logged in",
  },
  SERVER: {
    JWT_SECRET_NOT_CONFIGURED: "JWT_SECRET is not configured",
  },
} as const;

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;
