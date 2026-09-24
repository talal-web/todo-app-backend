import { HelloEntity } from "../../../domain/hello/HelloEntity.js";
import { IHelloRepository } from "../../../domain/hello/IHelloRepository.js";

export class HelloRepository implements IHelloRepository {
  async getHello(): Promise<HelloEntity> {
    return {
      message: "Hello, Talal Malik",
    };
  }
}
