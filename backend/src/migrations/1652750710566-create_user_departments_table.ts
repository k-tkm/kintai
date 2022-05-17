import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserDepartmentsTable1652750710566
  implements MigrationInterface
{
  name = 'createUserDepartmentsTable1652750710566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE user_departments (id int NOT NULL AUTO_INCREMENT, user_id int NOT NULL, department_id int NOT NULL, created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), deleted_at datetime(6) NULL, PRIMARY KEY (id)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE user_departments ADD CONSTRAINT FK_78098f9a7c51985e96b5326bca9 FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE user_departments ADD CONSTRAINT FK_f10514cebc5e624f08c1b558081 FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user_departments DROP FOREIGN KEY FK_f10514cebc5e624f08c1b558081`,
    );
    await queryRunner.query(
      `ALTER TABLE user_departments DROP FOREIGN KEY FK_78098f9a7c51985e96b5326bca9`,
    );
    await queryRunner.query(`DROP TABLE user_departments`);
  }
}
