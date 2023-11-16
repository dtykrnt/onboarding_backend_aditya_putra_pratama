module.exports = {
  name: 'default',
  type: 'postgres',
  host: '127.0.0.1',
  port: 5434,
  username: 'postgres',
  password: 123,
  database: 'onboarding_database',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}', 'dist/**/**/*.entity{.ts,.js}'],
  factories: ['dist/**/factories/**/*.js'],
  seeds: ['dist/**/seeds/**/*.js'],
}