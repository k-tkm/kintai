import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixAllForeignKeyToSpecifyCASECADEForOnUpdateAndOnDelete1652922649909
  implements MigrationInterface
{
  name = 'fixAllForeignKeyToSpecifyCASECADEForOnUpdateAndOnDelete1652922649909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE attendances DROP FOREIGN KEY FK_5e20bdbc6b72f0da23eb2ff1b60`,
    );
    await queryRunner.query(
      `ALTER TABLE vacations DROP FOREIGN KEY FK_89640b2dfe9d14d229c6943626f`,
    );
    await queryRunner.query(`ALTER TABLE vacations DROP COLUMN description`);
    await queryRunner.query(
      `ALTER TABLE vacations ADD description varchar(1000) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE attendances ADD CONSTRAINT FK_5e20bdbc6b72f0da23eb2ff1b60 FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE vacations ADD CONSTRAINT FK_89640b2dfe9d14d229c6943626f FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE vacations DROP FOREIGN KEY FK_89640b2dfe9d14d229c6943626f`,
    );
    await queryRunner.query(
      `ALTER TABLE attendances DROP FOREIGN KEY FK_5e20bdbc6b72f0da23eb2ff1b60`,
    );
    await queryRunner.query(`ALTER TABLE vacations DROP COLUMN description`);
    await queryRunner.query(
      `ALTER TABLE vacations ADD description varchar(200) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE vacations ADD CONSTRAINT FK_89640b2dfe9d14d229c6943626f FOREIGN KEY (userId) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE attendances ADD CONSTRAINT FK_5e20bdbc6b72f0da23eb2ff1b60 FOREIGN KEY (userId) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
