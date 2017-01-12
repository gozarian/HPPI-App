import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/first';

import { Account } from '../models/account';
import { HpApi } from './hp-api';

const CREDENTIALS_KEY = 'credentials';

@Injectable()
export class Session {
  account = null;

  constructor(private storage: Storage, private api: HpApi) {

  }

  public restore(): Observable<boolean> {
    return this.getStoredCredentials()
      .first(obj => {
        if (obj) {
          return Observable.create(observer => {
            this.new(obj.email, obj.password).first((account) => {
              return true;
            });
          });
        } else {
          return false;
        }
      });
  }

  public new(email: string, password: string): Observable<Account> {
    let login = this.api.login(email, password)
    .map(this.mapAccount);

    login.subscribe((account: Account) => {
      this.account = account;
      this.setStoredCredentials(email, password);
    },
    error => {
      this.clearStoredCredentials();
    });

    return login;
  }

  public destroy() {
    this.clearStoredCredentials();
  }

  private mapAccount(response: Response): Account {
    let item = response.json().Item;
    let account = <Account>({
      account_id: item.AccountId,
      status: item.Status,
      account_no: item.AccountNo
    });

    return account;
  }

  private setStoredCredentials(email: string, password: string) {
    this.storage.set(CREDENTIALS_KEY, { email: email, password: password });
  }

  private clearStoredCredentials() {
    this.storage.remove(CREDENTIALS_KEY);
  }

  public getStoredCredentials(): any {
    return Observable.fromPromise(this.storage.get(CREDENTIALS_KEY));
  }

}
