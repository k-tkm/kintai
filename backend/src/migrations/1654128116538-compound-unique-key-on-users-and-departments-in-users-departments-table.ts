import { MigrationInterface, QueryRunner } from 'typeorm';

export class compoundUniqueKeyOnUsersAndDepartmentsInUsersDepartmentsTable1654128116538
  implements MigrationInterface
{
  name =
    'compoundUniqueKeyOnUsersAndDepartmentsInUsersDepartmentsTable1654128116538';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX IDX_2a5bce7bdcf687fe73fb534c0e ON user_departments (user_id, department_id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IDX_2a5bce7bdcf687fe73fb534c0e ON user_departments`,
    );
  }
}
