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

@Entity("account")
@Index(["userId"])
export class Account {
  @PrimaryColumn({ type: "varchar", length: 255 })
  id!: string;

  @Column({ type: "text" })
  accountId!: string;

  @Column({ type: "text" })
  providerId!: string;

  @Column({ type: "varchar", length: 255 })
  userId!: string;

  @ManyToOne(() => User, (user) => user.accounts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user!: User;

  @Column({ type: "text", nullable: true })
  accessToken!: string | null;

  @Column({ type: "text", nullable: true })
  refreshToken!: string | null;

  @Column({ type: "text", nullable: true })
  idToken!: string | null;

  @Column({ type: "datetime", nullable: true })
  accessTokenExpiresAt!: Date | null;

  @Column({ type: "datetime", nullable: true })
  refreshTokenExpiresAt!: Date | null;

  @Column({ type: "text", nullable: true })
  scope!: string | null;

  @Column({ type: "text", nullable: true })
  password!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
