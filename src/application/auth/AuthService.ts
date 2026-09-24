import bcrypt from "bcryptjs";
import { ApiError } from "../../../http/errors/ApiError.js";
import {
  CreateUserPayload,
  IUserRepository,
} from "../../domain/auth/IUserRepository.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthService {
  constructor(
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository,
  ) {}
  async registerUser(data: CreateUserPayload) {
    const name = data.name?.trim();
    const email = data.email?.trim().toLocaleLowerCase();
    const password = data.password;

    if (!name || !email || !password) {
      throw new ApiError(400, "Name, email and password are required");
    }

    if (password.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters");
    }
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(409, "Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
    };
  }
}
