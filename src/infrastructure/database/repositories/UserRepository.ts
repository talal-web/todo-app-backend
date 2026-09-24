import { injectable } from "tsyringe";

import type {
  CreateUserPayload,
  IUserRepository,
} from "../../../domain/auth/IUserRepository.js";

import type { UserEntity } from "../../../domain/auth/UserEntity.js";

import { prisma } from "../prisma.js";

@injectable()
export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      passwordHash: user.password,
      created_at: user.createdAt,
    } satisfies UserEntity;
  }

  async createUser(data: CreateUserPayload): Promise<UserEntity> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      passwordHash: user.password,
      created_at: user.createdAt,
    } satisfies UserEntity;
  }
}
