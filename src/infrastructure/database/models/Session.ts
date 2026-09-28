import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";

import { User } from "./User.js";

@Entity("session")
@Index(["userId"])
export class Session {
  @PrimaryColumn({ type: "varchar", length: 255 })
  id!: string;

  @Column({ type: "datetime" })
  expiresAt!: Date;

  @Column({ type: "varchar", length: 255, unique: true })
  token!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: "text", nullable: true })
  ipAddress!: string | null;

  @Column({ type: "text", nullable: true })
  userAgent!: string | null;

  @Column({ type: "varchar", length: 255 })
  userId!: string;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user!: User;
}
