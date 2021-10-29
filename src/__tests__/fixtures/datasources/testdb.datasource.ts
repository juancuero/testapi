import {juggler} from '@loopback/repository';

export const testdb: juggler.DataSource = new juggler.DataSource({
  name: 'myMySql',
  connector: process.env.DB_CONNECTION,
  url: '',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_TESTING,
});
