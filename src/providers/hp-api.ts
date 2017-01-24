import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

// import { Account } from '../models/account';
import { Environment } from '../providers/environment';

@Injectable()
export class HpApi {
  private headers: Headers;

  constructor(private http: Http, private environment: Environment) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public login(email: string, password: string): Observable<Response> {
    return this.post('Accounts/GetAccountInfo/', email, password)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  // Account
  public getAccount(email: string, password: string): Observable<Response> {
    return this.post('Accounts/GetAccountInfo/', email, password)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  public resetAccountPassword(email: string): Observable<Response> {
    return this.post('Accounts/ResetPassword/', email, null)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  public updateAccountPassword(email: string, password: string, newPassword): Observable<Response> {
    return this.post('Accounts/UpdatePassword/', email, password, {newPassword:newPassword})
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  public updateBillingInfo(email: string, password: string,
    cc_num: string,
    cc_month: string,
    cc_year: string,
    cc_cvv: string,
    billing_name: string,
    billing_street: string,
    billing_city: string,
    billing_state: string,
    billing_postal_code: string
  ) {

    let params = {
      CreditCardNumber: cc_num,
      CreditExpireDate: cc_month + "-" + cc_year,
      CreditCVVNumber: cc_cvv,
      Name: billing_name,
      Street: billing_street,
      City: billing_city,
      State: billing_state,
      PostalCode: billing_postal_code,
      Country: "USA",
    };

    return this.post('Accounts/UpdateBilling/', email, password, params)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  public updateReimbursementAchInfo(email: string, password: string,
    bankAccountType:string,
    routingNumber:string,
    accountNumber:string
  ) {

    let params = {
      BankAccountType: bankAccountType,
      RoutingNumber: routingNumber,
      AccountNumber: accountNumber
    };

    return this.post('Accounts/SetReimbursementToACH/', email, password, params)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  public updateReimbursementCheckInfo(email: string, password: string,
    street:string,
    city:string,
    state:string,
    postal_code:string
  ) {

    let params = {
      Street: street,
      City: city,
      State: state,
      PostalCode: postal_code
    };

    return this.post('Accounts/SetReimbursementToCheck/', email, password, params)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  // Policies
  public getPolicies(email: string, password: string): Observable<Response> {
    return this.post('Pets/GetPetsByAccount/', email, password)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  // Claims
  public getClaims(email: string, password: string): Observable<Response> {
    return this.post('Claims/GetClaimsByAccount/', email, password)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  // Messages
  public getMessageCounts(email: string, password: string): Observable<Response> {
    return this.post('Messages/MessagesCountsByAccount/', email, password)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  public getMessages(email: string, password: string): Observable<Response> {
    return this.post('Messages/GetMessageByAccount/', email, password)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  public markMessageRead(email: string, password: string, messageId:string): Observable<Response> {
    return this.post('Messages/MarkMessageRead/', email, password, {id:messageId})
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  public deleteMessage(email: string, password: string, messageId:string): Observable<Response> {
    return this.post('Messages/DeleteMessage/', email, password, {id:messageId})
      .map(this.validateResponse)
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
        objectValue = encodeURIComponent(objectValue);
        return `${value}=${objectValue}`;
    }).join('&');
  }

  private isPrimitive(arg) {
    var type = typeof arg;
    return arg == null || (type != "object" && type != "function");
  }

}
