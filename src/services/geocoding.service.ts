import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {GeocodeResponse} from '../models/geocode-response.model';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class GeocodingService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async getPoints(address: String): Promise<GeocodeResponse> {
    const key = process.env.KEY_GEOCODING;
    const url =
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      address +
      '&' +
      key;

    const response = new GeocodeResponse();

    return fetch(url)
      .then((res: any) => res.json())
      .then((data: any) => {
        if (data.status === 'OK') {
          response.statusGeo = 'A';
          response.lat = data['results'][0]['geometry']['location']['lat'];
          response.lng = data['results'][0]['geometry']['location']['lng'];
        } else {
          response.statusGeo = 'F';
          response.lat = '0';
          response.lng = '0';
        }
        return response;
      });
  }
}
