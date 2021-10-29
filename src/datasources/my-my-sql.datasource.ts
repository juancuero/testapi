import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {Database} from '../config/database';

const config = {
  name: 'myMySql',
  connector: Database.DB_CONNECTION,
  url: '',
  host: Database.DB_HOST,
  port: Database.DB_PORT,
  user: Database.DB_USERNAME,
  password: Database.DB_PASSWORD,
  database: Database.DB_DATABASE,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MyMySqlDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'myMySql';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.myMySql', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
