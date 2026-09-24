import type { UserEntity } from "./UserEntity.js";

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  createUser(data: CreateUserPayload): Promise<UserEntity>;
}
