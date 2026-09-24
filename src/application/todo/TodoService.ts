import { inject, injectable } from "tsyringe";

import type {
  CreateTodoData,
  ITodoRepository,
  UpdateTodoData,
} from "../../domain/todo/ITodoRepository.js";
import { ApiError } from "../../../http/errors/ApiError.js";

@injectable()
export class TodoService {
  constructor(
    @inject("ITodoRepository")
    private readonly todoRepository: ITodoRepository,
  ) {}

  async createTodo(userId: string, data: CreateTodoData) {
    const title = data.title?.trim();

    if (!title) {
      throw new ApiError(400, "Todo title is required");
    }

    return this.todoRepository.create({
      title,
      userId,
    });
  }

  async getTodos(userId: string) {
    return this.todoRepository.findAll(userId);
  }

  async getTodo(id: number, userId: string) {
    return this.todoRepository.findById(id, userId);
  }

  async updateTodo(id: number, userId: string, data: UpdateTodoData) {
    if (data.title !== undefined) {
      const title = data.title.trim();

      if (!title) {
        throw new ApiError(400, "Todo title cannot be empty");
      }

      data = {
        ...data,
        title,
      };
    }

    return this.todoRepository.update(id, userId, data);
  }

  async deleteTodo(id: number, userId: string) {
    return this.todoRepository.delete(id, userId);
  }
}
