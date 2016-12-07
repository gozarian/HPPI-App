import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { ClaimChoosePage } from '../claim-choose/claim-choose';
import { MyClaimsPage } from '../my-claims/my-claims';
import { MessagesInboxPage } from '../messages-inbox/messages-inbox';
import { AccountPage } from '../account/account';
import { ScoopMainPage } from '../scoop-main/scoop-main';
import { ReferralPage } from '../referral/referral';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pages = [
    { title: 'New Claim',
      component: ClaimChoosePage,
      icon: 'md-clipboard',
      badge: false
    },
    { title: 'View My Claims',
      component: MyClaimsPage,
      icon: 'md-document',
      badge: false
    },
    { title: 'Messages',
      component: MessagesInboxPage,
      icon: 'md-mail',
      badge: 6
    },
    { title: 'My Account',
      component: AccountPage,
      icon: 'md-contact',
      badge: false
    },
    { title: 'The Scoop',
      component: ScoopMainPage,
      icon: 'md-book',
      badge: false
    },
    { title: 'Refer A Friend',
      component: ReferralPage,
      icon: 'ios-call',
      badge: false
    }
  ];

  constructor(
    public menuCtrl: MenuController,
    public nav: NavController
  ) {}

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
    this.nav.setRoot(page.component);
  }
}
