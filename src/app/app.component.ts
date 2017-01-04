import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { Session } from '../providers/session';
import { HpApi } from '../providers/hp-api';
import { Environment } from '../providers/environment';
import { Storage } from '@ionic/storage';
import { SignInPage, AccountPage, ChangePasswordPage, ContactPage, ClaimChoosePage, ClaimBirthdayPage, ClaimPhotoPage, ClaimVerifyPage, ClaimSummaryPage, BillingPage, FAQPage, MessagesInboxPage, MyClaimsPage, PaymentPage, PersonalInfoPage, PolicyPage, ReferralPage, ReimbursementPage, ResetPasswordPage, ScoopMainPage, SplashPage } from '../pages/pages';
import { Policy } from '../models/policy';
import { PolicyService } from '../services/policy.service';

@Component({
  templateUrl: 'app.html',
  providers: [
    Session,
    Storage,
    HpApi,
    Environment,
    PolicyService
  ]
})
export class MyApp implements OnInit {
  public rootPage: any = SplashPage;
  @ViewChild(Nav) nav: Nav;
  policies: Policy[];

  pages = [
    { title: 'Sign In', component: SignInPage },
    { title: 'Account', component: AccountPage },
    { title: 'Change Password', component: ChangePasswordPage },
    { title: 'Contact', component: ContactPage },
    { title: 'New Claim, Choose', component: ClaimChoosePage },
    { title: 'New Claim, B-day', component: ClaimBirthdayPage },
    { title: 'New Claim, Photo', component: ClaimPhotoPage },
    { title: 'New Claim, Verify', component: ClaimVerifyPage },
    { title: 'New Claim, Summary', component: ClaimSummaryPage },
    { title: 'Billing', component: BillingPage },
    { title: 'FAQ', component: FAQPage },
    { title: 'Messages', component: MessagesInboxPage },
    { title: 'My Claims', component: MyClaimsPage },
    { title: 'Payment', component: PaymentPage },
    { title: 'Personal Info', component: PersonalInfoPage },
    { title: 'Policy', component: PolicyPage },
    { title: 'Referral', component: ReferralPage },
    { title: 'Reimbursement', component: ReimbursementPage },
    { title: 'Reset Password', component: ResetPasswordPage },
    { title: 'Scoop, Main', component: ScoopMainPage }
  ];

  constructor(
    platform: Platform,
    public menu: MenuController,
    private policyService: PolicyService,
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

  getPolicies(): void {
    this.policyService.getPolicies().then(policies => this.policies = policies);
  }

  ngOnInit(): void {
    this.getPolicies();
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
