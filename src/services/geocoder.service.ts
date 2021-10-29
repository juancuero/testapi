import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {GeocoderDataSource} from '../datasources';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface Geocoder {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  geocode(address: string): Promise<any>;
}

export class GeocoderProvider implements Provider<Geocoder> {
  constructor(
    // geocoder must match the name property in the datasource json file
    @inject('datasources.geocoder')
    protected dataSource: GeocoderDataSource = new GeocoderDataSource(),
  ) {}

  value(): Promise<Geocoder> {
    return getService(this.dataSource);
  }
}
