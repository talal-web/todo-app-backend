import { injectable } from "tsyringe";

import { AppDataSource } from "../../../infrastructure/database/data-source.js";
import { Todo } from "../../../infrastructure/database/models/Todo.js";

import type { TodoEntity } from "../../../domain/todo/TodoEntity.js";
import type {
  CreateTodoData,
  ITodoRepository,
  UpdateTodoData,
} from "../../../domain/todo/ITodoRepository.js";

@injectable()
export class TodoRepository implements ITodoRepository {
  private get repository() {
    return AppDataSource.getRepository(Todo);
  }

  async create(data: CreateTodoData): Promise<TodoEntity> {
    const now = new Date();

    const todo = this.repository.create({
      title: data.title,
      userId: data.userId,
      createdAt: now,
      updatedAt: now,
    });

    return this.repository.save(todo);
  }

  async findAll(userId: string): Promise<TodoEntity[]> {
    return this.repository.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async findById(id: number, userId: string): Promise<TodoEntity | null> {
    return this.repository.findOne({
      where: { id, userId },
    });
  }

  async update(
    id: number,
    userId: string,
    data: UpdateTodoData,
  ): Promise<TodoEntity | null> {
    const result = await this.repository.update({ id, userId }, data);

    if (!result.affected) {
      return null;
    }

    return this.findById(id, userId);
  }

  async delete(id: number, userId: string): Promise<boolean> {
    const result = await this.repository.delete({
      id,
      userId,
    });

    return (result.affected ?? 0) > 0;
  }
}
