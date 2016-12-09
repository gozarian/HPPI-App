import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

import { Account } from '../models/account';
import { Environment } from '../providers/environment';

@Injectable()
export class HpApi {
  private headers: Headers;

  constructor(private http: Http, private environment: Environment) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public login(email: string, password: string): Observable<Account> {
    return this.post('Accounts/GetAccountInfo/', email, password)
      .map(this.validateResponse)
      .map(this.mapAccount)
      .catch(this.handleError);
  }

  private post(action, email, password, parameters = {}): Observable<Response> {
    let auth = {
      EmailAddress: email,
      Password: password,
      AppName: this.environment.apiAppName(),
      AppKey: this.environment.apiAppKey()
    };

    let mergedParams = Object.assign(parameters, auth);
    let body = this.objectToParams(mergedParams);
    let url = `${ this.environment.apiBaseUrl() }${ action }`;

    return this.http.post(url, body, { headers: this.headers }).share();
  }

  private validateResponse(response: Response): Response {
    let json = response.json();

    if (json) {

      if (json.ErrorCode !== 0) {
        throw Error(json.ErrorDescription);
      }

    } else {
      throw Error('Invalid server response');
    }
    return response;
  }

  private handleError(error: Error) {
    var message = error.message;

    if (message == 'PermissionDeniedUser') {
      message = "Invalid username or password";
    } else {
      message = "Server error";
    }

    return Observable.throw(Error(message));
  }

  private objectToParams(object): string {
    return Object.keys(object).map((value) => {
        var objectValue = this.isPrimitive(object[value]) ? object[value] : JSON.stringify(object[value]);
        return `${value}=${objectValue}`;
    }).join('&');
  }

  private isPrimitive(arg) {
    var type = typeof arg;
    return arg == null || (type != "object" && type != "function");
  }

  // Mappers

  private mapAccount(response: Response): Account {
    let item = response.json().Item;
    let account = <Account>({
      account_id: item.AccountId,
      status: item.Status,
      account_no: item.AccountNo
    });

    return account;
  }

}
