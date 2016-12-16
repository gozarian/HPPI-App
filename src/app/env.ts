export class ENV {
  public static current: string = 'development';

  public static development: any = {
    api_base_url: 'http://services.hptest.info/api/v1/',
    api_app_name: 'mobileios',
    api_app_key: 'mobilekey',
    faq_url: 'http://www.hptest.info/Frequent-Questions/AppFAQ',
    scoop_url: 'http://hptest.info/blog/?nativeAppView=true',
    learn_more_url: 'http://www.healthypawspetinsurance.com/',
    oops_url: 'http://my.hptest.info/OopsBadEOB.aspx',
    referral_url: 'http://www.hptest.info/refer-a-friend/share-app.aspx?utm_source=RAFShare&utm_medium=App&utm_campaign=Main-Nav'    
  }

  public static production: any = {

  }
}
