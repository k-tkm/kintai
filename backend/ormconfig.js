module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/entities/*.entity.js'],
  migrations: ['./src/migrations/*.ts'],
  seeds: ['dist/seeds/*.js'],
  factories: ['dist/factories/*.js'],
  cli: {
    migrationsDir: './src/migrations',
  },
};
