import { Injectable } from '@angular/core';
import { ENV } from '../app/env';

@Injectable()
export class Environment {

  public apiBaseUrl(): string {
    return this.getValue('api_base_url');
  }

  public apiAppName(): string {
    return this.getValue('api_app_name');
  }

  public apiAppKey(): string {
    return this.getValue('api_app_key');
  }

  public faqsUrl(): string {
    return this.getValue('faq_url');
  }

  public scoopUrl(): string {
    return this.getValue('scoop_url');
  }

  public learnMoreUrl(): string {
    return this.getValue('learn_more_url');
  }

  public oopsUrl(): string {
    return this.getValue('oops_url');
  }

  public referralUrl(): string {
    return this.getValue('referral_url');
  }

  private getValue(key: string): any {
    var values = ENV.development;

    if (ENV.current == 'production') {
      values = ENV.production;
    }

    return values[key];
  }

}
