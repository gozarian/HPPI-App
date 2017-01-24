import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { PersonalInfoPage } from '../personal-info/personal-info';
import { BillingPage } from '../billing/billing';
import { PaymentPage } from '../payment/payment';
import { ReimbursementPage } from '../reimbursement/reimbursement';
import { ChangePasswordPage } from '../change-password/change-password';
import { PolicyPage } from '../policy/policy';
import { FAQPage } from '../faq/faq';
import { ContactPage } from '../contact/contact';
import { SignInPage } from '../sign-in/sign-in';

import { Session } from '../../providers/session';
import { AccountProvider } from '../../providers/account.provider';
import { PolicyProvider } from '../../providers/policy.provider';

import { Policy } from '../../models/policy';
import { Account } from '../../models/account';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  providers: [AccountProvider, PolicyProvider]
})
export class AccountPage {

  loading;
  account: Account;
  display_name:string;
  display_email:string;
  display_address:string;

  policies: Policy[];

  billing_information_index = 1;
  information = [
    { title: 'Personal Info',
      component: PersonalInfoPage,
      notification: false
    },
    { title: 'Policy and Billing Info',
      component: BillingPage,
      notification: false
    },
    { title: 'Edit Payment Method',
      component: PaymentPage,
      notification: false
    },
    { title: 'Edit Reimbursement Info',
      component: ReimbursementPage,
      notification: false
    },
    { title: 'Change Password',
      component: ChangePasswordPage,
      notification: false
    }
  ];

  support = [
    { title: 'Help & FAQ\s',
      component: FAQPage,
      notification: false
    },
    { title: 'Contact Healthy Paws',
      component: ContactPage,
      notification: false
    }
  ];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private accountProvider: AccountProvider,
    private policyProvider: PolicyProvider,
    private session: Session
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.getAccount();
      this.getPolicies();
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

  getAccount(): void {
    this.presentLoading();
    this.accountProvider.getAccountInfo().subscribe(
      (account) => {
        this.account = account;
        this.information[this.billing_information_index].notification = account.status === "Suspended";
        let contact = account.primary_contact;
        this.display_name = contact.first_name + " " + contact.last_name;
        this.display_email = contact.email;

        let address = account.billing_address;
        this.display_address = address.street + "  " + address.city + ", " + address.state_province + " " + address.postal_code;
        this.closeLoading();
      }
    );
  }

  getPolicies(): void {
    this.policyProvider.getPolicies().subscribe(
      (policies) => {
        this.policies = policies;
      }
    );
  }

  openPolicy(policy) {
    this.navCtrl.push(PolicyPage, policy);
  }

  itemSelected(item) {
    this.navCtrl.push(item.component);
  }

  logout() {
    this.session.destroy();
    this.navCtrl.setRoot(SignInPage);
  }
}
