module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'develop',
  password: 'password',
  database: 'kintai',
  entities: ['dist/entities/*.entity.js'],
  migrations: ['./src/migrations/*.ts'],
  seeds: ['dist/seeds/*.js'],
  factories: ['dist/factories/*.js'],
  cli: {
    migrationsDir: './src/migrations',
  },
};
