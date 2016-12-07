import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { SignInPage, AccountPage, ContactPage, ClaimChoosePage, ClaimBirthdayPage, ClaimPhotoPage, ClaimVerifyPage, ClaimSummaryPage, BillingPage, FAQPage, MessagesDetailPage, MessagesInboxPage, MyClaimsPage, PasswordPage, PaymentPage, PersonalInfoPage, PolicyPage, ReferralPage, ScoopMainPage, ScoopDetailPage } from '../pages/pages';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage: any = HomePage;
  @ViewChild(Nav) nav: Nav;

  pages = [
    { title: 'Sign In', component: SignInPage },
    { title: 'Account', component: AccountPage },
    { title: 'Contact', component: ContactPage },
    { title: 'New Claim, Choose', component: ClaimChoosePage },
    { title: 'New Claim, B-day', component: ClaimBirthdayPage },
    { title: 'New Claim, Photo', component: ClaimPhotoPage },
    { title: 'New Claim, Verify', component: ClaimVerifyPage },
    { title: 'New Claim, Summary', component: ClaimSummaryPage },
    { title: 'Billing', component: BillingPage },
    { title: 'FAQ', component: FAQPage },
    { title: 'Messages, Inbox', component: MessagesInboxPage },
    { title: 'Messages, Detail', component: MessagesDetailPage },
    { title: 'My Claims', component: MyClaimsPage },
    { title: 'Password', component: PasswordPage },
    { title: 'Payment', component: PaymentPage },
    { title: 'Personal Info', component: PersonalInfoPage },
    { title: 'Policy', component: PolicyPage },
    { title: 'Referral', component: ReferralPage },
    { title: 'Scoop, Main', component: ScoopMainPage },
    { title: 'Scoop, Detail', component: ScoopDetailPage }
  ];

  constructor(
    platform: Platform,
    public menu: MenuController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.menu.close();
    this.nav.setRoot(HomePage);
  }
}
