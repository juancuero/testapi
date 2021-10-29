import {juggler} from '@loopback/repository';
import {Database} from '../../../config/database';

export const testdb: juggler.DataSource = new juggler.DataSource({
  name: 'myMySql',
  connector: Database.DB_CONNECTION,
  url: '',
  host: Database.DB_HOST,
  port: Database.DB_PORT,
  user: Database.DB_USERNAME,
  password: Database.DB_PASSWORD,
  database: process.env.DB_DATABASE_TESTING,
});
