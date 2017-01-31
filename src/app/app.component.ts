import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen, Network } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { Session } from '../providers/session';
import { HpApi } from '../providers/hp-api';
import { Environment } from '../providers/environment';
import { Storage } from '@ionic/storage';
import { SignInPage, SplashPage } from '../pages/pages';
import { AccountProvider } from '../providers/account.provider';
import { PolicyProvider } from '../providers/policy.provider';
import { MessageProvider } from '../providers/message.provider';
import { OfflinePage } from '../pages/offline/offline';

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

  constructor(
    platform: Platform,
    public storage: Storage,
    session: Session,
    public modalCtrl: ModalController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      session.restore().subscribe(
        () => {
          this.rootPage = HomePage;
        },
        () => {
          this.rootPage = SignInPage;
        }
      )
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

  modal = null;

  showOfflineModal() {
    if (this.modal == null) {
      this.modal = this.modalCtrl.create(OfflinePage);
      this.modal.present();
    }
  }

  hideOfflineModal() {
    if (this.modal) {
      this.modal.dismiss();
      this.modal = null;
    }
  }

  ngOnInit(): void {
    this.getLaunchCount();

    Network.onConnect().subscribe(
      () => {
      this.hideOfflineModal();
    });
    Network.onDisconnect().subscribe(
      () => {
      this.showOfflineModal();
    });
  }
}
