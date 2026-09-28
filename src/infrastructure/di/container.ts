import { container } from "tsyringe";
import { TodoRepository } from "../database/repositories/TodoRepository.js";

container.register("ITodoRepository", {
  useClass: TodoRepository,
});

export { container };
