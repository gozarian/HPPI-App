export class ENV {
  public static current: string = 'development';

  public static development: any = {
    api_base_url: 'http://services.hptest.info/api/v1/',
    api_app_name: 'mobileios',
    api_app_key: 'mobilekey'
  }

  public static production: any = {
    api_base_url: 'http://services.hptest.info/api/v1/',
    api_app_name: 'mobileios',
    api_app_key: 'mobilekey'
  }
}
