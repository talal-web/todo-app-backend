import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { IUserRepository } from "../../domain/auth/IUserRepository";
import type { CreateUser } from "../../domain/auth/UserEntity";
import { ApiError } from "../../../http/errors/ApiError";

export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(data: CreateUser) {
    if (typeof data.password !== "string" || data.password.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters");
    }

    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ApiError(409, "Email already registered");
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
      throw new ApiError(401, "Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new ApiError(500, "JWT_SECRET is not configured");
    }

    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "5m" });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
