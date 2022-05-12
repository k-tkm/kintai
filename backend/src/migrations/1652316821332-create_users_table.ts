import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1652316821332 implements MigrationInterface {
  name = 'createUsersTable1652316821332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, email varchar(200) NOT NULL, firstName varchar(200) NOT NULL, lastName varchar(200) NOT NULL, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), deletedAt datetime(6) NULL, UNIQUE INDEX IDX_97672ac88f789774dd47f7c8be (email), PRIMARY KEY (id)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
