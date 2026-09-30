import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { IUserRepository } from "../../domain/auth/IUserRepository.js";
import type { CreateUser } from "../../domain/auth/UserEntity.js";
import { ApiError } from "../../../http/errors/ApiError.js";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../../../http/errors/errorMessages.js";

@injectable()
export class AuthService {
  constructor(
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async register(data: CreateUser) {
    if (typeof data.password !== "string" || data.password.length < 8) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.AUTH.PASSWORD_TOO_SHORT,
      );
    }

    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        ERROR_MESSAGES.AUTH.EMAIL_ALREADY_REGISTERED,
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
      );
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES.SERVER.JWT_SECRET_NOT_CONFIGURED,
      );
    }

    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "15m" });

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      token,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
