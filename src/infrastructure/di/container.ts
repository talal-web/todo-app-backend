import { container } from "tsyringe";

import { TodoRepository } from "../database/repositories/TodoRepository.js";
import { UserRepository } from "../database/repositories/UserRepository.js";

container.register("ITodoRepository", {
  useClass: TodoRepository,
});

container.register("IUserRepository", {
  useClass: UserRepository,
});

export { container };
