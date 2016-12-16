export class ENV {
  public static current: string = 'development';

  public static development: any = {
    api_base_url: 'http://services.hptest.info/api/v1/',
    api_app_name: 'mobileios',
    api_app_key: 'mobilekey',
    faq_url: 'http://www.hptest.info/Frequent-Questions/AppFAQ'
  }

  public static production: any = {

  }
}
