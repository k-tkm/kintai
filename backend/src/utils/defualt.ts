import { getConnectionManager } from 'typeorm';
import { Connection } from 'typeorm';

export const defaultQuery = async (tenantId: number): Promise<Connection> => {
  const conn = getConnectionManager().get();
  await conn.query(`set company.id = "${tenantId}"`);

  return conn;
};
