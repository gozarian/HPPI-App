import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
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
export class AccountPage implements OnInit {

  policies: Policy[];

  information = [
    { title: 'Personal Info',
      component: PersonalInfoPage,
      notification: false
    },
    { title: 'Policy and Billing Info',
      component: BillingPage,
      notification: true
    },
    { title: 'Update Billing Info',
      component: PaymentPage,
      notification: false
    },
    { title: 'Change Reimbursement Info',
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
    private policyProvider: PolicyProvider,
    private session: Session) {}

  getPolicies(): void {
    this.policyProvider.getPolicies().subscribe(
      (policies) => {
        this.policies = policies
      }
    );
  }

  ngOnInit(): void {
    this.getPolicies();
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
