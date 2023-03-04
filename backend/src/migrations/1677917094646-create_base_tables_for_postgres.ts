import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBaseTablesForPostgres1677917094646
  implements MigrationInterface
{
  name = 'createBaseTablesForPostgres1677917094646';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "departments" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_8681da666ad9699d568b3e91064" UNIQUE ("name"), CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_departments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, "department_id" integer, CONSTRAINT "UQ_2a5bce7bdcf687fe73fb534c0ee" UNIQUE ("user_id", "department_id"), CONSTRAINT "PK_ca8d1bbbf9bb49c79c706807fae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."vacations_type_enum" AS ENUM('paid', 'sick', 'childcare', 'maternity')`,
    );
    await queryRunner.query(
      `CREATE TABLE "vacations" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying(1000) NOT NULL, "type" "public"."vacations_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "PK_830973008a9b7e114e612442750" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(200) NOT NULL, "firstName" character varying(200) NOT NULL, "lastName" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."attendances_status_enum" AS ENUM('begin', 'end')`,
    );
    await queryRunner.query(
      `CREATE TABLE "attendances" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "status" "public"."attendances_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_departments" ADD CONSTRAINT "FK_78098f9a7c51985e96b5326bca9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_departments" ADD CONSTRAINT "FK_f10514cebc5e624f08c1b558081" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacations" ADD CONSTRAINT "FK_7483432adbbf72a858041efdc61" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendances" ADD CONSTRAINT "FK_aa902e05aeb5fde7c1dd4ced2b7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendances" DROP CONSTRAINT "FK_aa902e05aeb5fde7c1dd4ced2b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacations" DROP CONSTRAINT "FK_7483432adbbf72a858041efdc61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_departments" DROP CONSTRAINT "FK_f10514cebc5e624f08c1b558081"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_departments" DROP CONSTRAINT "FK_78098f9a7c51985e96b5326bca9"`,
    );
    await queryRunner.query(`DROP TABLE "attendances"`);
    await queryRunner.query(`DROP TYPE "public"."attendances_status_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "vacations"`);
    await queryRunner.query(`DROP TYPE "public"."vacations_type_enum"`);
    await queryRunner.query(`DROP TABLE "user_departments"`);
    await queryRunner.query(`DROP TABLE "departments"`);
  }
}
