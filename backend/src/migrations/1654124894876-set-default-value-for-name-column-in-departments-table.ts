import { MigrationInterface, QueryRunner } from 'typeorm';

export class setDefaultValueForNameColumnInDepartmentsTable1654124894876
  implements MigrationInterface
{
  name = 'setDefaultValueForNameColumnInDepartmentsTable1654124894876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE departments CHANGE name name varchar(200) NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE departments CHANGE name name varchar(200) NOT NULL`,
    );
  }
}
