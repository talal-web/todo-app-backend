import { injectable } from "tsyringe";

import { prisma } from "../prisma.js";

import type { TodoEntity } from "../../../domain/todo/TodoEntity.js";
import type {
  CreateTodoData,
  ITodoRepository,
  UpdateTodoData,
} from "../../../domain/todo/ITodoRepository.js";

@injectable()
export class TodoRepository implements ITodoRepository {
  async create(data: CreateTodoData): Promise<TodoEntity> {
    return prisma.todo.create({
      data: {
        title: data.title,
        userId: data.userId,
      },
    });
  }

  async findAll(userId: string): Promise<TodoEntity[]> {
    return prisma.todo.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number, userId: string): Promise<TodoEntity | null> {
    return prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(
    id: number,
    userId: string,
    data: UpdateTodoData,
  ): Promise<TodoEntity | null> {
    const todo = await this.findById(id, userId);

    if (!todo) {
      return null;
    }

    return prisma.todo.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number, userId: string): Promise<boolean> {
    const todo = await this.findById(id, userId);

    if (!todo) {
      return false;
    }

    await prisma.todo.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
