import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import { MenuController, NavController, ModalController, Content, ViewController, LoadingController } from 'ionic-angular';

import { NewFeaturesPage } from './new-features-modal';
import { ClaimChoosePage } from '../claim-choose/claim-choose';
import { MyClaimsPage } from '../my-claims/my-claims';
import { MessagesInboxPage } from '../messages-inbox/messages-inbox';
import { AccountPage } from '../account/account';
import { ScoopMainPage } from '../scoop-main/scoop-main';
import { ReferralPage } from '../referral/referral';
import { PolicyPage } from '../policy/policy';
import { Policy } from '../../models/policy';
import { AccountProvider } from '../../providers/account.provider';
import { PolicyProvider } from '../../providers/policy.provider';
import { MessageProvider } from '../../providers/message.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Storage, AccountProvider, PolicyProvider, MessageProvider]
})
export class HomePage {

  @ViewChild(Content) content: Content;
  policies: Policy[];
  alert:string = '';

  scrollToTop() {
    this.content.scrollToTop();
  }

  loading;

  // For updating the unread message badge
  messagePageIndex = 2;

  pages = [
    { title: 'New Claim',
      component: ClaimChoosePage,
      icon: 'ion-icon-new-claim',
      badge: false
    },
    { title: 'View My Claims',
      component: MyClaimsPage,
      icon: 'ion-icon-view-claims',
      badge: false
    },
    { title: 'Messages',
      component: MessagesInboxPage,
      icon: 'ion-icon-messages',
      badge: 0
    },
    { title: 'My Account',
      component: AccountPage,
      icon: 'ion-icon-account',
      badge: false
    },
    { title: 'The Scoop',
      component: ScoopMainPage,
      icon: 'ion-icon-scoop',
      badge: false
    },
    { title: 'Refer A Friend',
      component: ReferralPage,
      icon: 'ion-icon-referral',
      badge: false
    }
  ];

  display_name = '';

  constructor(
    public storage: Storage,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private accountProvider: AccountProvider,
    public loadingCtrl: LoadingController,
    private policyProvider: PolicyProvider,
    private messageProvider: MessageProvider
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.loadData();
    });
  }

  getLaunchCount() {
    this.storage.get('launchCount').then(applaunchCount => {
      if (applaunchCount == 1) {
        this.showNewFeatures();
        applaunchCount++
        this.storage.set('launchCount', applaunchCount);
      }
    });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    this.loading.present();
  }

  closeLoading() {
    if (this.loading == 'undefined') { return; };
    this.loading.dismiss();
  }

  loadData(): void {
    this.presentLoading();
    Observable.combineLatest(
      this.accountProvider.getAccountInfo(),
      this.policyProvider.getPolicies(),
      this.messageProvider.getMessageCounts().retry(1),
      this.accountProvider.getAlerts()
    )
    .finally(
      () => {
        this.closeLoading();
      }
    )
    .subscribe(
      (values) => {
        let account = values[0];
        this.policies = values[1];
        let messageCounts = values[2];
        let alerts = values[3];

        if (alerts.length > 0) {
          this.alert = alerts[0];
        }

        this.display_name = account.primary_contact.first_name;

        if (messageCounts.unread > 0) {
          this.pages[this.messagePageIndex].badge = messageCounts.unread;
        }

        this.getLaunchCount();
      },
      (error) => {
        // TODO: Show Toast w/error.message
        
      }
    );
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  openAccount() {
    this.navCtrl.push(AccountPage, this.policies);
  }

  openPolicy(policy) {
    this.navCtrl.push(PolicyPage, {policy:policy});
  }

  showNewFeatures() {
    this.scrollToTop();
    let newFeatures = this.modalCtrl.create(NewFeaturesPage);
    newFeatures.present();
  }
}
