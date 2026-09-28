import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";

import { User } from "./User.js";

@Entity("todos")
@Index(["userId"])
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "boolean", default: false })
  completed!: boolean;

  @Column({ type: "varchar", length: 255 })
  userId!: string;

  @ManyToOne(() => User, (user) => user.todos, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
