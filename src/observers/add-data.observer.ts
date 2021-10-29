import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import {User} from '../models';
import {UserRepository} from '../repositories';
const faker = require('faker');

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('AddDataGroup')
export class AddDataObserver implements LifeCycleObserver {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    // Add your logic for start
    const count = (await this.userRepository.count()).count;
    if (count !== 0) return;

    for (let i = 0; i < 10; i++) {
      const user = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address:
          faker.address.streetName() + ' ' + faker.address.streetAddress(),
        city: faker.address.cityName(),
      });

      await this.userRepository.create(user);
    }
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
