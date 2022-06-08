import { MigrationInterface, QueryRunner } from 'typeorm';

export class createVacationsTable1652320971195 implements MigrationInterface {
  name = 'createVacationsTable1652320971195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE vacations (id int NOT NULL AUTO_INCREMENT, date datetime NOT NULL, description varchar(200) NOT NULL, type enum ('paid', 'sick', 'childcare', 'maternity') NOT NULL, created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), deleted_at datetime(6) NULL, user_id int NULL, PRIMARY KEY (id)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE vacations ADD CONSTRAINT FK_89640b2dfe9d14d229c6943626f FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE vacations DROP FOREIGN KEY FK_89640b2dfe9d14d229c6943626f`,
    );
    await queryRunner.query(`DROP TABLE vacations`);
  }
}
