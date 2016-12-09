import { Injectable } from '@angular/core';
import { ENV } from '../app/env';

@Injectable()
export class Environment {

  public apiBaseUrl() : string {
    return this.getValue('api_base_url');
  }

  public apiAppName() : string {
    return this.getValue('api_app_name');
  }

  public apiAppKey() : string {
    return this.getValue('api_app_key');
  }

  private getValue(key: string): any {
    var values = ENV.development;

    if (ENV.current == 'production') {
      values = ENV.production;
    }

    return values[key];
  }

}
