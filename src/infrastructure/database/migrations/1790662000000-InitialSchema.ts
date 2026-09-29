import type { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1790662000000 implements MigrationInterface {
  name = "InitialSchema1790662000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id varchar(36) NOT NULL,
        email varchar(255) NOT NULL,
        name varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        UNIQUE INDEX IDX_users_email (email),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE todos (
        id int NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        completed tinyint NOT NULL DEFAULT 0,
        userId varchar(36) NOT NULL,
        createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
          ON UPDATE CURRENT_TIMESTAMP(6),
        INDEX IDX_todos_userId (userId),
        PRIMARY KEY (id),
        CONSTRAINT FK_todos_userId
          FOREIGN KEY (userId) REFERENCES users(id)
          ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE todos`);
    await queryRunner.query(`DROP TABLE users`);
  }
}
