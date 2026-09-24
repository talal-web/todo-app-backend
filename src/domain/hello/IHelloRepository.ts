import { HelloEntity } from "./HelloEntity.js";
export interface IHelloRepository {
  getHello(): Promise<HelloEntity>;
}
