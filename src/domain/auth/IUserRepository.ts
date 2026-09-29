import type { CreateUser, UserEntity } from "./UserEntity.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;

  findById(id: string): Promise<UserEntity | null>;

  create(data: CreateUser): Promise<UserEntity>;
}
