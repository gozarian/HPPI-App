import { Injectable } from '@angular/core';
import { Transfer, FileUploadResult } from 'ionic-native';
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
  private headersJson: Headers;
  // private headersImage: Headers;

  constructor(private http: Http, private environment: Environment) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headersJson = new Headers();
    this.headersJson.append('Content-Type', 'application/json');
    // this.headersImage = new Headers();
    // this.headersImage.append('Content-Type', 'image/jpeg');
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

  public retryAccountPayment(email: string, password: string): Observable<Response> {
    return this.post('Accounts/RetryBilling/', email, null)
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
      BillingInfo: {
        CreditCardNumber: cc_num,
        CreditExpireDate: cc_month + "-" + cc_year,
        CreditCVVNumber: cc_cvv,
        Name: billing_name,
        Street: billing_street,
        City: billing_city,
        State: billing_state,
        PostalCode: billing_postal_code,
        Country: "USA",
      },
      updateMailingAlso: "false"
    };

    return this.postJson('Accounts/UpdateBilling/', email, password, params)
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

  public updatePolicyDatePetJoined(email: string, password: string,
    policy_id: string,
    date_pet_joined_family: string // Format is: MM/dd/yyyy
  ): Observable<Response> {
    return this.post('Pets/UpdatePet/', email, password,
      {
        PetID:policy_id,
        DateJoinedFamily:date_pet_joined_family
      }
    )
    .map(this.validateResponse)
    .catch(this.handleError);
  }

  // Claims
  public getClaims(email: string, password: string): Observable<Response> {
    return this.post('Claims/GetClaimsByAccount/', email, password)
      .map(this.validateResponse)
      .catch(this.handleError);
  }

  public submitClaim(
    email: string,
    password: string,
    policyNumber:string,
    petId:string,
    imagePaths:string[]
  ): Observable<Response> {

    let imageUploads:Observable<string>[] = [];

    for (var path of imagePaths) {
      imageUploads.push(
        this.uploadImage(email, password, policyNumber, 'Claim', path)
        .map(this.mapImageResults)
      );
    }

    return Observable.combineLatest(imageUploads)
    .flatMap((imageUrls:string[]): Observable<Response> => {
      return this.postJson('Claims/SubmitClaim/', email, password, {
        PetID: petId,
        ImagesURLs: imageUrls
      });
    })
    .map(this.validateResponse)
    .catch(this.handleError);
  }

  private mapImageResults(result: FileUploadResult): string {
    let responseText = result.response;

    return responseText;
  }

  public uploadImage(email: string, password:string, policyNumber:string, imageType:string, imagePath:string): Observable<FileUploadResult> {
    return this.postImage('Upload/Send/', email, password, policyNumber, imageType, imagePath)
    .map(this.validateUploadResponse)
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

  public getAccountAlerts(email: string, password: string) : Observable<Response> {
    return this.post('Accounts/GetAlerts/', email, password)
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

  private postImage(action:string, email:string, password:string, policyNumber:string, imageType:string, imagePath:string): Observable<FileUploadResult> {
    let auth = {
      Email: email,
      Password: password,
      AppName: this.environment.apiAppName(),
      AppKey: this.environment.apiAppKey()
    };

    let mergedParams = Object.assign({
      PetPolicyNo: policyNumber,
      ImageType: imageType
    }, auth);

    let options = {
      params: mergedParams,
      fileKey: 'ImageFile',
      fileName: 'claimImage.jpg',
      mimeType: "image/jpeg"
    };

    let url = `${ this.environment.apiBaseUrl() }${ action }`;
    let fileTransfer = new Transfer();

    return Observable.fromPromise(fileTransfer.upload(imagePath, url, options)).share();
  }

  private postJson(action, email, password, parameters = {}): Observable<Response> {
    let auth = {
      EmailAddress: email,
      Password: password,
      AppName: this.environment.apiAppName(),
      AppKey: this.environment.apiAppKey()
    };

    let mergedParams = Object.assign(parameters, auth);
    let body = JSON.stringify(mergedParams);
    let url = `${ this.environment.apiBaseUrl() }${ action }`;

    return this.http.post(url, body, { headers: this.headersJson }).share();
  }

  private validateUploadResponse(response: FileUploadResult): FileUploadResult {
    return response;
  }

  private validateResponse(response: Response): Response {
    let json = response.json();

    if (json) {

      if (json.ErrorCode == 0) {
        return response;
      }
      else if (json.ErrorCode == 2 && json.ErrorDescription === 'NoItemsFound') {
        return response;
      }
      else {
        throw Error(json.ErrorDescription);
      }

    } else {
      throw Error('Invalid server response');
    }
  }

  private handleError(error: Error) {
    var message = error.message;

    if (message == 'PermissionDeniedUser') {
      message = "Invalid username or password";
    } else if (message == 'AccountNotFound' || message == 'MultipleAccountsFound') {
      message = "We did not recognize that email address";
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

  public mapSuccess(response: Response): boolean {
    let errorCode = response.json().ErrorCode;
    return errorCode == 0;
  }
}
