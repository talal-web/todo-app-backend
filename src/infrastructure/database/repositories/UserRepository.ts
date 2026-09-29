import { AppDataSource } from "../../database/data-source.js";
import { User } from "../models/User.js";
import type {
  CreateUser,
  UserEntity,
} from "../../../domain/auth/UserEntity.js";
import type { IUserRepository } from "../../../domain/auth/IUserRepository.js";

export class UserRepository implements IUserRepository {
  private get repo() {
    return AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
      },
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: { id },
    });
  }

  async create(data: CreateUser): Promise<UserEntity> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}
