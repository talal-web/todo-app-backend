import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import { Todo } from "./Todo.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", select: false })
  password!: string;

  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos!: Todo[];
}
