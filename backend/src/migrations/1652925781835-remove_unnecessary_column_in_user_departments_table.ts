import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeUnnecessaryColumnInUserDepartmentsTable1652925781835
  implements MigrationInterface
{
  name = 'removeUnnecessaryColumnInUserDepartmentsTable1652925781835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user_departments DROP FOREIGN KEY FK_78098f9a7c51985e96b5326bca9`,
    );
    await queryRunner.query(
      `ALTER TABLE user_departments DROP FOREIGN KEY FK_f10514cebc5e624f08c1b558081`,
    );
    await queryRunner.query(
      `ALTER TABLE user_departments CHANGE user_id user_id int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE user_departments CHANGE department_id department_id int NULL`,
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
    await queryRunner.query(
      `ALTER TABLE user_departments CHANGE department_id department_id int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE user_departments CHANGE user_id user_id int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE user_departments ADD CONSTRAINT FK_f10514cebc5e624f08c1b558081 FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE user_departments ADD CONSTRAINT FK_78098f9a7c51985e96b5326bca9 FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
