import {User} from '../../models';
import {UserRepository} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';
const faker = require('faker');

export async function givenEmptyDatabase() {
  await new UserRepository(testdb).deleteAll();
}

export function givenUserData(data?: Partial<User>) {
  return Object.assign(
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetName() + ' ' + faker.address.streetAddress(),
      city: faker.address.cityName(),
    },
    data,
  );
}

export async function givenUser(data?: Partial<User>) {
  return new UserRepository(testdb).create(givenUserData(data));
}
