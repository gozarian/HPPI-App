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
import { DepositPage } from '../pages/deposit/deposit';
import { FAQPage } from '../pages/faq/faq';
import { MessagesDetailPage } from '../pages/messages-detail/messages-detail';
import { MessagesInboxPage } from '../pages/messages-inbox/messages-inbox';
import { MyClaimsPage } from '../pages/my-claims/my-claims';
import { MyClaimsDetailPage } from '../pages/my-claims-detail/my-claims-detail';
import { NewFeaturesPage } from '../pages/home/new-features-modal';
import { OfflinePage } from '../pages/offline/offline';
import { PaymentPage } from '../pages/payment/payment';
import { PersonalInfoPage } from '../pages/personal-info/personal-info';
import { PolicyPage } from '../pages/policy/policy';
import { ReferralPage } from '../pages/referral/referral';
import { ReimbursementPage } from '../pages/reimbursement/reimbursement';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ScoopMainPage } from '../pages/scoop-main/scoop-main';
import { SplashPage } from '../pages/splash/splash';

import { Session } from '../providers/session'
import { HpApi } from '../providers/hp-api'
import { AccountProvider } from '../providers/account.provider'
import { MessageProvider } from '../providers/message.provider'

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
    DepositPage,
    FAQPage,
    MessagesDetailPage,
    MessagesInboxPage,
    MyClaimsPage,
    MyClaimsDetailPage,
    NewFeaturesPage,
    OfflinePage,
    PaymentPage,
    PersonalInfoPage,
    PolicyPage,
    ReferralPage,
    ReimbursementPage,
    ResetPasswordPage,
    ScoopMainPage,
    SplashPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: 'ios',
      scrollAssist: false,
      autoFocusAssist: false,
      platforms: {
        ios: {
          statusbarPadding: true
        },
        android: {
          statusbarPadding: false
        }
      }
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
    DepositPage,
    FAQPage,
    MessagesDetailPage,
    MessagesInboxPage,
    MyClaimsPage,
    MyClaimsDetailPage,
    NewFeaturesPage,
    OfflinePage,
    PaymentPage,
    PersonalInfoPage,
    PolicyPage,
    ReferralPage,
    ReimbursementPage,
    ResetPasswordPage,
    ScoopMainPage,
    SplashPage
  ],
  providers: [
    { provide: HpApi, useClass: HpApi },
    { provide: Session, useClass: Session },
    { provide: AccountProvider, useClass: AccountProvider },
    { provide: MessageProvider, useClass: MessageProvider },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule {}
