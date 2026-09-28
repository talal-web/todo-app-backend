import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity("verification")
@Index(["identifier"])
export class Verification {
  @PrimaryColumn({ type: "varchar", length: 255 })
  id!: string;

  @Column({ type: "text" })
  identifier!: string;

  @Column({ type: "text" })
  value!: string;

  @Column({ type: "datetime" })
  expiresAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
