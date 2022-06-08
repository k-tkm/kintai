import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDepartmentsTable1652747520519 implements MigrationInterface {
  name = 'createDepartmentsTable1652747520519';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE departments (id int NOT NULL AUTO_INCREMENT, name varchar(200) NOT NULL, created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), deleted_at datetime(6) NULL, UNIQUE INDEX IDX_8681da666ad9699d568b3e9106 (name), PRIMARY KEY (id)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IDX_8681da666ad9699d568b3e9106 ON departments`,
    );
    await queryRunner.query(`DROP TABLE departments`);
  }
}
