import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { HpApi } from './hp-api';
import { Session } from './session';
import { Message } from '../models/message';

import { MESSAGES } from '../mock-messages';

@Injectable()
export class MessageProvider {

  constructor(
    private hpApi: HpApi,
    private session: Session
  ) {}

  public getMessages(): Observable<Message[]> {

    return this.session.getStoredCredentials()
    .flatMap(
      (credentials) => {
        return this.hpApi.getMessages(credentials.email, credentials.password);
      }
    )
    .map(this.mapMessages);
  }

  private mapMessages(response: Response): Message[] {
    let items = response.json().Items;
    return items.map(
      (item) => {
        let message = <Message>({
          id:item.id,
          account_id: item.AccountId,
          title: item.title,
          content: item.body,
          unread: item.unread,
          date: item.CreatedDate,
          time_ago: item.time_ago,
        });

        return message;
      }
    );
  }

}
