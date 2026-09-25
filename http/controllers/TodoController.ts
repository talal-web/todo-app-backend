import type { Request, Response } from "express";
import { container } from "tsyringe";

import { TodoService } from "../../src/application/todo/TodoService.js";
import { ApiResponse } from "../response/ApiResponse.js";

export class TodoController {
  private readonly todoService: TodoService;

  constructor() {
    this.todoService = container.resolve(TodoService);
  }

  private getUserId(req: Request): string {
    return req.user.id;
  }

  private getUser(req: Request) {
    return req.user;
  }

  async create(req: Request, res: Response): Promise<void> {
    const userId = this.getUserId(req);

    const todo = await this.todoService.createTodo(userId, req.body);

    ApiResponse.success(res, 201, "Todo created successfully", todo);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const user = this.getUser(req);

    const data = await this.todoService.getTodos(user);

    ApiResponse.success(res, 200, "Todos retrieved successfully", data);
  }

  async getOne(req: Request, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const id = Number(req.params.id);

    const todo = await this.todoService.getTodo(id, userId);

    if (!todo) {
      ApiResponse.error(res, 404, "Todo not found");
      return;
    }

    ApiResponse.success(res, 200, "Todo retrieved successfully", todo);
  }

  async update(req: Request, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const id = Number(req.params.id);

    const todo = await this.todoService.updateTodo(id, userId, req.body);

    if (!todo) {
      ApiResponse.error(res, 404, "Todo not found");
      return;
    }

    ApiResponse.success(res, 200, "Todo updated successfully", todo);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const id = Number(req.params.id);

    const deleted = await this.todoService.deleteTodo(id, userId);

    if (!deleted) {
      ApiResponse.error(res, 404, "Todo not found");
      return;
    }

    ApiResponse.success(res, 200, "Todo deleted successfully");
  }
}
