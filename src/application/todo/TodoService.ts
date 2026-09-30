import { inject, injectable } from "tsyringe";

import type {
  CreateTodoData,
  ITodoRepository,
  UpdateTodoData,
} from "../../domain/todo/ITodoRepository.js";

import type { IUserRepository } from "../../domain/auth/IUserRepository.js";
import { ApiError } from "../../../http/errors/ApiError.js";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../../../http/errors/errorMessages.js";

@injectable()
export class TodoService {
  constructor(
    @inject("ITodoRepository")
    private readonly todoRepository: ITodoRepository,

    @inject("IUserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async createTodo(userId: string, data: CreateTodoData) {
    const title = data.title?.trim();

    if (!title) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.TODO.TITLE_REQUIRED,
      );
    }

    return this.todoRepository.create({
      title,
      userId,
    });
  }

  async getTodos(userId: string) {
    const [user, todos] = await Promise.all([
      this.userRepository.findById(userId),
      this.todoRepository.findAll(userId),
    ]);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND);
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      todos,
    };
  }

  async getTodo(id: number, userId: string) {
    return this.todoRepository.findById(id, userId);
  }

  async updateTodo(id: number, userId: string, data: UpdateTodoData) {
    if (data.title !== undefined) {
      const title = data.title.trim();

      if (!title) {
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          ERROR_MESSAGES.TODO.TITLE_EMPTY,
        );
      }

      data = { ...data, title };
    }

    return this.todoRepository.update(id, userId, data);
  }

  async deleteTodo(id: number, userId: string) {
    return this.todoRepository.delete(id, userId);
  }
}
