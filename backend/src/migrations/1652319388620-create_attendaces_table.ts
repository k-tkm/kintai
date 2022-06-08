import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAttendacesTable1652319388620 implements MigrationInterface {
  name = 'createAttendacesTable1652319388620';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE attendances (id int NOT NULL AUTO_INCREMENT, date datetime NOT NULL, status enum ('begin', 'end') NOT NULL, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), deletedAt datetime(6) NULL, user_id int NULL, PRIMARY KEY (id)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE attendances ADD CONSTRAINT FK_5e20bdbc6b72f0da23eb2ff1b60 FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE attendances DROP FOREIGN KEY FK_5e20bdbc6b72f0da23eb2ff1b60`,
    );
    await queryRunner.query(`DROP TABLE attendances`);
  }
}
