import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCompaniesTable1677918730907 implements MigrationInterface {
  name = 'createCompaniesTable1677918730907';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "vacations" ADD "company_id" integer`);
    await queryRunner.query(`ALTER TABLE "users" ADD "company_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "user_departments" ADD "company_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ADD "company_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" ADD "company_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacations" ADD CONSTRAINT "FK_a384ba5002ef45bd00242fc7f1f" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_departments" ADD CONSTRAINT "FK_b59bda425551ddbc1b486f1d82e" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ADD CONSTRAINT "FK_541e3d07c93baa9cc42b149a5fb" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" ADD CONSTRAINT "FK_90bec1a9a7766a4707d43d7af80" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
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
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "company_id"`);
    await queryRunner.query(`ALTER TABLE "vacations" DROP COLUMN "company_id"`);
    await queryRunner.query(`DROP TABLE "companies"`);
  }
}
