import { container } from "tsyringe";

import { UserRepository } from "../database/repositories/UserRepository.js";
import { TodoRepository } from "../database/repositories/TodoRepository.js";

container.register("ITodoRepository", {
  useClass: TodoRepository,
});

container.register("IUserRepository", {
  useClass: UserRepository,
});

export { container };
