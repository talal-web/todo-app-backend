import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Todo } from "./Todo.js";
import { Session } from "./Session.js";
import { Account } from "./Account.js";

@Entity("user")
export class User {
  @PrimaryColumn({ type: "varchar", length: 255 })
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "boolean", default: false })
  emailVerified!: boolean;

  @Column({ type: "text", nullable: true })
  image!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos!: Todo[];

  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  @OneToMany(() => Account, (account) => account.user)
  accounts!: Account[];
}
