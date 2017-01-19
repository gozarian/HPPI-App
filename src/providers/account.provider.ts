import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { HpApi } from './hp-api';
import { Session } from './session';
import { Account } from '../models/account';
import { Address } from '../models/address';
import { Contact } from '../models/contact';

@Injectable()
export class AccountProvider {

  constructor(
    private hpApi: HpApi,
    private session: Session
  ) {}

  public getAccountInfo(): Observable<Account> {

    return this.session.getStoredCredentials()
    .flatMap(
      (credentials) => {
        return this.hpApi.getAccount(credentials.email, credentials.password);
      }
    )
    .map(mapAccount);
  }

  public resetPassword(email): Observable<boolean> {

    return this.hpApi.resetAccountPassword(email)
    .map(mapSuccess);
  }

  public updatePassword(newPassword:string): Observable<boolean> {

    let email = '';

    return this.session.getStoredCredentials()
    .flatMap(
      (credentials) => {
        email = credentials.email;
        return this.hpApi.updateAccountPassword(credentials.email, credentials.password, newPassword);
      }
    )
    .map(mapSuccess)
    .map(
      (success) => {
        if (success) {
          this.session.setStoredCredentials(email, newPassword);
        }
        return success
      }
    );
  }

  public updatePaymentInfo(
    cc_num: string,
    cc_month: string,
    cc_year: string,
    cc_cvv: string,
    billing_name: string,
    billing_street: string,
    billing_unit_apt: string,
    billing_city: string,
    billing_state: string,
    billing_postal_code: string
  ) {
    return this.session.getStoredCredentials()
    .flatMap(
      (credentials) => {
        return this.hpApi.updateBillingInfo(
          credentials.email, credentials.password,
          cc_num,
          cc_month,
          cc_year,
          cc_cvv,
          billing_name,
          billing_street,
          billing_unit_apt,
          billing_city,
          billing_state,
          billing_postal_code,
        )
      }
    )
    .map(mapSuccess)
  }
}

function mapAccount(response: Response): Account {
  let item = response.json().Item;

  let account = <Account>({
    account_id: item.AccountID,
    status: item.Status,
    account_no: item.AccountNo,
    monthly_premium: item.MonthlyPremium,
    billing_day: item.BillingDay,
    past_due_ammount: item.PastDueAmount,
    payment_method: item.PaymentMethod,
    credit_card_last4: item.Last4CreditCard,
    password_reset: item.PasswordReset ? true : false,
    billing_address: mapAddress(item.BillingAddress),
    primary_contact: mapContact(item.PetParentInfo),
    secondary_contact: mapContact(item.PetParent2Info)
  });

  return account;
}

function mapAddress(item:any) : Address {
  let address = <Address>({
    name: item.Name,
    street: item.Street,
    city: item.City,
    state_province: item.State,
    postal_code: item.PostalCode,
    country: item.Country
  });

  return address;
}

function mapContact(item:any) : Contact {
  let contact = <Contact>({
    first_name: item.FirstName,
    last_name: item.LastName,
    email: item.Email,
    primary_phone: item.PrimaryPhone,
    secondary_phone: item.SecondaryPhone,
  });

  return contact;
}

function mapSuccess(response: Response): boolean {
  let errorCode = response.json().ErrorCode;
  return errorCode == 0;
}
