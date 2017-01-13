import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, ModalController, Content, ViewController } from 'ionic-angular';
import { NewFeaturesPage } from './new-features-modal';
import { ClaimChoosePage } from '../claim-choose/claim-choose';
import { MyClaimsPage } from '../my-claims/my-claims';
import { MessagesInboxPage } from '../messages-inbox/messages-inbox';
import { AccountPage } from '../account/account';
import { ScoopMainPage } from '../scoop-main/scoop-main';
import { ReferralPage } from '../referral/referral';
import { PolicyPage } from '../policy/policy';
import { Policy } from '../../models/policy';
import { PolicyProvider } from '../../providers/policy.provider';
import { MessageProvider } from '../../providers/message.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PolicyProvider, MessageProvider]
})
export class HomePage {

  @ViewChild(Content) content: Content;
  policies: Policy[];

  scrollToTop() {
    this.content.scrollToTop();
  }

  accountError: boolean = false;

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

  user = {
    name: "user"
  };

  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private policyProvider: PolicyProvider,
    private messageProvider: MessageProvider
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.getUnreadMessageCount();
      this.getPolicies();
    })
  }

  getPolicies(): void {
    this.policyProvider.getPolicies().then(policies => this.policies = policies);
  }

  getUnreadMessageCount(): void {
    this.messageProvider.getMessageCounts()
    .subscribe((counts) => {
      if (counts.unread > 0) {
        this.pages[this.messagePageIndex].badge = counts.unread;
      }
    });
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
    this.navCtrl.push(PolicyPage, policy);
  }

  showNewFeatures() {
    this.scrollToTop();
    let newFeatures = this.modalCtrl.create(NewFeaturesPage);
    newFeatures.present();
  }
}
