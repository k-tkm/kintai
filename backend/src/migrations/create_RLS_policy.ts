import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRLSPolicy1677918906478 implements MigrationInterface {
  name = 'createRLSPolicy1677918906478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    `CREATE POLICY user_tenant_id_policy ON users FOR ALL USING (company_id = current_setting('company.id'))`;
    `ALTER TABLE users ENABLE ROW LEVEL SECURITY`;

    `CREATE POLICY attendance_tenant_id_policy ON attendances FOR ALL USING (company_id = current_setting('company.id'))`;
    `ALTER TABLE attendances ENABLE ROW LEVEL SECURITY`;

    `CREATE POLICY vacation_tenant_id_policy ON vacations FOR ALL USING (company_id = current_setting('company.id'))`;
    `ALTER TABLE vacations ENABLE ROW LEVEL SECURITY`;

    `CREATE POLICY department_tenant_id_policy ON departments FOR ALL USING (company_id = current_setting('company.id'))`;
    `ALTER TABLE departments ENABLE ROW LEVEL SECURITY`;

    `CREATE POLICY userDepartment_tenant_id_policy ON user_departments FOR ALL USING (company_id = current_setting('company.id'))`;
    `ALTER TABLE user_departments ENABLE ROW LEVEL SECURITY`;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
