import type { Request, Response } from "express";
import { HelloService } from "../../src/application/hello/AuthService.js";
import { HelloRepository } from "../../src/infrastructure/database/repositories/HelloRepository.js";

const helloRepository = new HelloRepository();
const helloService = new HelloService(helloRepository);

export const HelloController = async (req: Request, res: Response) => {
  const result = await helloService.getHello();
  res.json(result);
};
