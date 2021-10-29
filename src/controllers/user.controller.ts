import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {serviceProxy} from '@loopback/service-proxy';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {Geocoder, GeocodingService} from '../services';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @serviceProxy('geocoder')
    private geocoder: Geocoder,
    @service(GeocodingService)
    public geocodingService: GeocodingService,
  ) {}

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @get('/users/setCoordenates')
  @response(200, {
    description:
      'update latitude and longitude with google geocoding (Datasource Rest)',
    content: {
      'application/json': {
        schema: {
          type: 'object',
        },
      },
    },
  })
  async setCoordenates(): Promise<object> {
    const users = await this.userRepository.find();

    for (const user of users) {
      const geo = await this.geocoder.geocode(user.address + ', ' + user.city);

      if (geo.status === 'OK') {
        user.lat = geo.results[0]['geometry']['location']['lat'];
        user.lng = geo.results[0]['geometry']['location']['lng'];
        user.statusGeo = 'A';
      } else {
        user.statusGeo = 'F';
      }
      await this.userRepository.replaceById(user.id, user);
    }

    return {status: 'Process successfully executed.'};
  }

  @get('/users/setCoordenates2')
  @response(200, {
    description:
      'Update latitude and longitude with google geocoding (node-fetch rest)',
    content: {
      'application/json': {
        schema: {
          type: 'object',
        },
      },
    },
  })
  async setCoordenates2(): Promise<object> {
    const users = await this.userRepository.find();

    for (const user of users) {
      const geoResponse = await this.geocodingService.getPoints(user.title);
      user.lat = geoResponse.lat;
      user.lng = geoResponse.lng;
      user.statusGeo = geoResponse.statusGeo;
      await this.userRepository.replaceById(user.id, user);
    }

    return {status: 'Process successfully executed.'};
  }
}
