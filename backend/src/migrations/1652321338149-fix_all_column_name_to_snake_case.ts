import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixAllColumnNameToSnakeCase1652321338149
  implements MigrationInterface
{
  name = 'fixAllColumnNameToSnakeCase1652321338149';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP COLUMN createdAt`);
    await queryRunner.query(`ALTER TABLE users DROP COLUMN updatedAt`);
    await queryRunner.query(`ALTER TABLE users DROP COLUMN deletedAt`);
    await queryRunner.query(`ALTER TABLE attendances DROP COLUMN createdAt`);
    await queryRunner.query(`ALTER TABLE attendances DROP COLUMN updatedAt`);
    await queryRunner.query(`ALTER TABLE attendances DROP COLUMN deletedAt`);
    await queryRunner.query(
      `ALTER TABLE users ADD created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE users ADD updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE users ADD deleted_at datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE attendances ADD created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE attendances ADD updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE attendances ADD deleted_at datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE attendances DROP COLUMN deleted_at`);
    await queryRunner.query(`ALTER TABLE attendances DROP COLUMN updated_at`);
    await queryRunner.query(`ALTER TABLE attendances DROP COLUMN created_at`);
    await queryRunner.query(`ALTER TABLE users DROP COLUMN deleted_at`);
    await queryRunner.query(`ALTER TABLE users DROP COLUMN updated_at`);
    await queryRunner.query(`ALTER TABLE users DROP COLUMN created_at`);
    await queryRunner.query(
      `ALTER TABLE attendances ADD deletedAt datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE attendances ADD updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE attendances ADD createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE users ADD deletedAt datetime(6) NULL`);
    await queryRunner.query(
      `ALTER TABLE users ADD updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE users ADD createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }
}
