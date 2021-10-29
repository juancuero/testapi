import {Client, createRestAppClient, expect} from '@loopback/testlab';
import {TestapiApplication} from '../../application';
import {User} from '../../models';
import {testdb} from '../fixtures/datasources/testdb.datasource';
import {givenEmptyDatabase, givenUser} from '../helpers/database.helpers';

describe('UserController', () => {
  let app: TestapiApplication;
  let client: Client;

  before(givenRunningApp);
  before(givenEmptyDatabase);
  after(async () => {
    await app.stop();
  });

  describe('invokes GET /users/count', () => {
    it('it should get count = 0', async () => {
      const expectedRes = {count: 0};
      const res = await client.get('/users/count').expect(200);
      expect(res.body).to.containEql(expectedRes);
    });
  });

  describe('invokes GET /users', () => {
    it('it should get 0 users', async () => {
      const res = await client.get('/users').expect(200);
      const expectedRes: User[] = [];
      expect(res.body).to.deepEqual(expectedRes);
    });
  });

  describe('invokes POST /users', () => {
    it('it should get the created user', async () => {
      const res = await client
        .post('/users')
        .expect(200)
        .send(<Partial<User>>{
          firstName: 'Juan',
          lastName: 'Cuero',
          address: 'Calle falsa 123',
          city: 'Villavicencio',
        });

      const expectedRes: Partial<User> = {
        id: 1,
        firstName: 'Juan',
        lastName: 'Cuero',
        address: 'Calle falsa 123',
        city: 'Villavicencio',
        lat: '0',
        lng: '0',
      };

      expect(res.body).to.deepEqual(expectedRes);
    });
  });

  describe('invokes GET /users/count expect = 1', () => {
    it('it should get count = 1', async () => {
      const expectedRes = {count: 1};
      const response = await client.get('/users/count').expect(200);
      expect(response.body).to.containEql(expectedRes);
    });
  });

  describe('invokes PATCH /users/:id', () => {
    it('it should update a user given the id, expect 204', async () => {
      await client
        .patch('/users/1')
        .expect(204)
        .send(<Partial<User>>{
          firstName: 'Juan Manuel',
          lastName: 'Cuero Ortega',
          address: 'Cra. 31 #38-109',
          city: 'Villavicencio',
        });
    });
  });

  describe('invokes GET /users  expect = 2 users', () => {
    it('it should get the list of users, length 2', async () => {
      await givenUser(<Partial<User>>{
        firstName: 'Jhon',
        lastName: 'Doe',
        address: 'Cl. 36 #2-171',
        city: 'Cartagena',
      });

      const res = await client.get('/users').expect(200);
      const users = res.body;
      expect(users).to.be.a.Array();
      expect(users.length).to.eql(2);
    });
  });

  describe('invokes GET /users/setCoordenates', () => {
    it('it should update coordenates get from google encode with Dataresource REST', async () => {
      const res = await client.get('/users/setCoordenates').expect(200);
      const expectedRes = {status: 'Process successfully executed.'};
      expect(res.body).to.containEql(expectedRes);
    });
  });

  describe('invokes GET /users/:id -> Dataresource REST', () => {
    it('it should get a user by the given id with lat,lng. Dataresource REST', async () => {
      const res = await client.get('/users/1').expect(200);

      const expectedRes: Partial<User> = {
        id: 1,
        firstName: 'Juan Manuel',
        lastName: 'Cuero Ortega',
        address: 'Cra. 31 #38-109',
        city: 'Villavicencio',
        lat: '4.1525275',
        lng: '-73.637354',
        statusGeo: 'A',
      };

      expect(res.body).to.deepEqual(expectedRes);
    });
  });

  describe('invokes GET /users/setCoordenates2', () => {
    it('it should update coordenates get from google encode with node-fetch', async () => {
      await givenUser(<Partial<User>>{
        firstName: 'Pepito',
        lastName: 'Perez',
        address: 'Cl. 61 #56-2 a 56-44',
        city: 'Medellin',
      });

      const res = await client.get('/users/setCoordenates').expect(200);
      const expectedRes = {status: 'Process successfully executed.'};
      expect(res.body).to.containEql(expectedRes);
    });
  });

  describe('invokes GET /users/:id -> check node-fetch', () => {
    it('it should get a user by the given id with lat,lng. node-fetch', async () => {
      const res = await client.get('/users/3').expect(200);

      const expectedRes: Partial<User> = {
        id: 3,
        firstName: 'Pepito',
        lastName: 'Perez',
        address: 'Cl. 61 #56-2 a 56-44',
        city: 'Medellin',
        lat: '6.2604101',
        lng: '-75.5705705',
        statusGeo: 'A',
      };

      expect(res.body).to.deepEqual(expectedRes);
    });
  });

  async function givenRunningApp() {
    app = new TestapiApplication({
      rest: {
        port: 0,
      },
    });
    await app.boot();

    app.dataSource(testdb);
    await app.start();
    const existingSchema = 'drop';
    await app.migrateSchema({existingSchema, models: ['User']});

    client = createRestAppClient(app);
  }
});
