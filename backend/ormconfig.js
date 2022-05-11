module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'develop',
  password: 'password',
  database: 'kintai',
  entities: ['./src/entities/*.entity.ts'],
  migrations: ['./src/migrations/{*.ts}'],
  cli: {
    migrationsDir: './src/migrations',
  },
};
