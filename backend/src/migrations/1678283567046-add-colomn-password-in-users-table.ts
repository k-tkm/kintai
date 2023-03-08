import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColomnPasswordInUsersTable1678283567046
  implements MigrationInterface
{
  name = 'addColomnPasswordInUsersTable1678283567046';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(200) NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
  }
}
