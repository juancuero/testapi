import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class GeocodeResponse extends Model {
  @property({
    type: 'string',
    required: false,
  })
  statusGeo?: string;

  @property({
    type: 'string',
    required: false,
  })
  lat?: string;

  @property({
    type: 'string',
    required: false,
  })
  lng?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GeocodeResponse>) {
    super(data);
  }
}

export interface GeocodeResponseRelations {
  // describe navigational properties here
}

export type GeocodeResponseWithRelations = GeocodeResponse &
  GeocodeResponseRelations;
