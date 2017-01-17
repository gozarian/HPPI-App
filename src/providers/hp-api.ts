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

  public resetAccountPassword(email: string, password: string): Observable<Response> {
    return this.post('Accounts/ResetPassword/', email, password)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  public updateAccountPassword(email: string, password: string, newPassword): Observable<Response> {
    return this.post('Accounts/UpdatePassword/', email, password, {newPassword:newPassword})
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
        return `${value}=${objectValue}`;
    }).join('&');
  }

  private isPrimitive(arg) {
    var type = typeof arg;
    return arg == null || (type != "object" && type != "function");
  }

}
