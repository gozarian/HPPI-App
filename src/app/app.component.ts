import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { Session } from '../providers/session';
import { HpApi } from '../providers/hp-api';
import { Environment } from '../providers/environment';
import { Storage } from '@ionic/storage';
import { SignInPage, SplashPage } from '../pages/pages';
import { AccountProvider } from '../providers/account.provider';
import { PolicyProvider } from '../providers/policy.provider';
import { MessageProvider } from '../providers/message.provider';

import { Policy } from '../models/policy';

@Component({
  templateUrl: 'app.html',
  providers: [
    Session,
    Storage,
    HpApi,
    Environment,
    AccountProvider,
    PolicyProvider,
    MessageProvider
  ]
})
export class MyApp implements OnInit {
  public rootPage: any = SplashPage;
  @ViewChild(Nav) nav: Nav;
  policies: Policy[];

  constructor(
    platform: Platform,
    public storage: Storage,
    private policyProvider: PolicyProvider,
    session: Session
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      session.restore().subscribe(() => {
        this.rootPage = HomePage;
      },
      () => {
        this.rootPage = SignInPage;
      })

    });
  }

  getLaunchCount() {
    this.storage.get('launchCount').then(applaunchCount => {
      if (!applaunchCount) {
        let applaunchCount = 1;
        this.storage.set('launchCount', applaunchCount);
      }
    });
  }

  getPolicies(): void {
    this.policyProvider.getPolicies().subscribe(
      (policies) => {
        this.policies = policies
      }
    );
  }

  ngOnInit(): void {
    this.getPolicies();
    this.getLaunchCount();
  }
}
