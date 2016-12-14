import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, ModalController, Content } from 'ionic-angular';
import { NewFeaturesPage } from './new-features-modal';
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

  @ViewChild(Content) content: Content;

  scrollToTop() {
    this.content.scrollToTop();
  }

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
      badge: 6
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

  pets = [
    {
      name: "Samson",
      image: "/assets/test-imgs/test-doodle.jpg",
      type: "dog"
    },
    {
      name: "Pupils",
      image: "/assets/test-imgs/test-cat.jpg",
      type: "cat"
    },
    {
      name: "Crazy Long Name for a Pet",
      image: "/assets/test-imgs/test-doodle.jpg",
      type: "dog"
    },
    {
      name: "Bagel",
      image: "/assets/test-imgs/test-doodle-bagel.jpg",
      type: "dog"
    },
    {
      name: "Kitty",
      image: "/assets/test-imgs/test-cat.jpg",
      type: "cat"
    },
    {
      name: "Sleepy",
      image: "/assets/test-imgs/test-doodle.jpg",
      type: "dog"
    }
  ];

  user = {
    name: "peter"
  };

  constructor(
    public menuCtrl: MenuController,
    public nav: NavController,
    public modalCtrl: ModalController
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

  showNewFeatures() {
    this.scrollToTop();
    let newFeatures = this.modalCtrl.create(NewFeaturesPage);
    newFeatures.present();
  }
}
