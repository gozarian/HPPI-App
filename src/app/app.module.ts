import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { AccountPage } from '../pages/account/account';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ContactPage } from '../pages/contact/contact';
import { ClaimChoosePage } from '../pages/claim-choose/claim-choose';
import { ClaimBirthdayPage } from '../pages/claim-birthday/claim-birthday';
import { ClaimPhotoPage } from '../pages/claim-photo/claim-photo';
import { ClaimVerifyPage } from '../pages/claim-verify/claim-verify';
import { ClaimSummaryPage } from '../pages/claim-summary/claim-summary';
import { BillingPage } from '../pages/billing/billing';
import { FAQPage } from '../pages/faq/faq';
import { FAQContentPage } from '../pages/faq/faq-content';
import { MessagesDetailPage } from '../pages/messages-detail/messages-detail';
import { MessagesInboxPage } from '../pages/messages-inbox/messages-inbox';
import { MyClaimsPage } from '../pages/my-claims/my-claims';
import { MyClaimsDetailPage } from '../pages/my-claims-detail/my-claims-detail';
import { PaymentPage } from '../pages/payment/payment';
import { PersonalInfoPage } from '../pages/personal-info/personal-info';
import { PolicyPage } from '../pages/policy/policy';
import { ReferralPage } from '../pages/referral/referral';
import { ScoopMainPage } from '../pages/scoop-main/scoop-main';
import { ScoopDetailPage } from '../pages/scoop-detail/scoop-detail';
import { SplashPage } from '../pages/splash/splash';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignInPage,
    AccountPage,
    ChangePasswordPage,
    ContactPage,
    ClaimChoosePage,
    ClaimBirthdayPage,
    ClaimPhotoPage,
    ClaimVerifyPage,
    ClaimSummaryPage,
    BillingPage,
    FAQPage,
    FAQContentPage,
    MessagesDetailPage,
    MessagesInboxPage,
    MyClaimsPage,
    MyClaimsDetailPage,
    PaymentPage,
    PersonalInfoPage,
    PolicyPage,
    ReferralPage,
    ScoopMainPage,
    ScoopDetailPage,
    SplashPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignInPage,
    AccountPage,
    ChangePasswordPage,
    ContactPage,
    ClaimChoosePage,
    ClaimBirthdayPage,
    ClaimPhotoPage,
    ClaimVerifyPage,
    ClaimSummaryPage,
    BillingPage,
    FAQPage,
    FAQContentPage,
    MessagesDetailPage,
    MessagesInboxPage,
    MyClaimsPage,
    MyClaimsDetailPage,
    PaymentPage,
    PersonalInfoPage,
    PolicyPage,
    ReferralPage,
    ScoopMainPage,
    ScoopDetailPage,
    SplashPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
