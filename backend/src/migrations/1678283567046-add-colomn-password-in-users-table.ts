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
    await queryRunner.query(
      `ALTER TABLE "attendances" DROP CONSTRAINT "FK_90bec1a9a7766a4707d43d7af80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" DROP CONSTRAINT "FK_541e3d07c93baa9cc42b149a5fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_departments" DROP CONSTRAINT "FK_b59bda425551ddbc1b486f1d82e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacations" DROP CONSTRAINT "FK_a384ba5002ef45bd00242fc7f1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" DROP COLUMN "company_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" DROP COLUMN "company_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_departments" DROP COLUMN "company_id"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
  }
}
