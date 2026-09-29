export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}
