import { HelloRepository } from "../../infrastructure/database/repositories/HelloRepository.js";

export class HelloService {
  constructor(private readonly helloRepository: HelloRepository) {}
  async getHello() {
    const result = await this.helloRepository.getHello();
    return result;
  }
}
