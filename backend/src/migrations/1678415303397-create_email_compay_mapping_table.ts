import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEmailCompayMappingTable1678415303397
  implements MigrationInterface
{
  name = 'createEmailCompayMappingTable1678415303397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "email_company_mapping" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company_id" integer, "user_id" integer, CONSTRAINT "UQ_54f7fa3b49183928cb22a1e2594" UNIQUE ("email"), CONSTRAINT "PK_5444e6435945bdb3c275962b3ea" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "email_company_mapping" ADD CONSTRAINT "FK_a28d76a6ba43e793c05fd0e35f3" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_company_mapping" ADD CONSTRAINT "FK_86a6a5e260bf307141866d671a8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "email_company_mapping" DROP CONSTRAINT "FK_86a6a5e260bf307141866d671a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_company_mapping" DROP CONSTRAINT "FK_a28d76a6ba43e793c05fd0e35f3"`,
    );
    await queryRunner.query(`DROP TABLE "email_company_mapping"`);
  }
}
