import type { Request, Response } from "express";
import { container } from "tsyringe";

import { TodoService } from "../../src/application/todo/TodoService.js";
import { ApiResponse } from "../response/ApiResponse.js";
import { ApiError } from "../errors/ApiError.js";

export class TodoController {
  private readonly todoService: TodoService;

  constructor() {
    this.todoService = container.resolve(TodoService);
  }

  private getUserId(req: Request): string {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    return req.user.id;
  }

  private getTodoId(req: Request): number {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new ApiError(400, "Invalid todo ID");
    }

    return id;
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);

    const todo = await this.todoService.createTodo(userId, req.body);

    ApiResponse.success(res, 201, "Todo created successfully", todo);
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);

    const data = await this.todoService.getTodos(userId);

    ApiResponse.success(res, 200, "Todos retrieved successfully", data);
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const id = this.getTodoId(req);

    const todo = await this.todoService.getTodo(id, userId);

    if (!todo) {
      ApiResponse.error(res, 404, "Todo not found");
      return;
    }

    ApiResponse.success(res, 200, "Todo retrieved successfully", todo);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const id = this.getTodoId(req);

    const todo = await this.todoService.updateTodo(id, userId, req.body);

    if (!todo) {
      ApiResponse.error(res, 404, "Todo not found");
      return;
    }

    ApiResponse.success(res, 200, "Todo updated successfully", todo);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const id = this.getTodoId(req);

    const deleted = await this.todoService.deleteTodo(id, userId);

    if (!deleted) {
      ApiResponse.error(res, 404, "Todo not found");
      return;
    }

    ApiResponse.success(res, 200, "Todo deleted successfully");
  };
}
