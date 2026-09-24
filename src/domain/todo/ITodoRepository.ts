import type { TodoEntity } from "./TodoEntity.js";

export interface CreateTodoData {
  title: string;
  userId: string;
}

export interface UpdateTodoData {
  title?: string;
  completed?: boolean;
}

export interface ITodoRepository {
  create(data: CreateTodoData): Promise<TodoEntity>;

  findAll(userId: string): Promise<TodoEntity[]>;

  findById(id: number, userId: string): Promise<TodoEntity | null>;

  update(
    id: number,
    userId: string,
    data: UpdateTodoData,
  ): Promise<TodoEntity | null>;

  delete(id: number, userId: string): Promise<boolean>;
}
