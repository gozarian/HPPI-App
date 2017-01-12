import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { HpApi } from './hp-api';
import { Session } from './session';
import { Message, MessageCounts } from '../models/message';

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

  public getMessageCounts(): Observable<MessageCounts> {

    return this.session.getStoredCredentials()
    .flatMap(
      (credentials) => {
        return this.hpApi.getMessageCounts(credentials.email, credentials.password);
      }
    )
    .map(this.mapMessageCounts);
  }

  public markMessageRead(message:Message) : Observable<boolean> {

    return this.session.getStoredCredentials()
    .flatMap(
      (credentials) => {
        return this.hpApi.markMessageRead(credentials.email, credentials.password, message.id);
      }
    )
    .map(() =>  { return true; })
  }

  public deleteMessage(message:Message) : Observable<boolean> {

    return this.session.getStoredCredentials()
    .flatMap(
      (credentials) => {
        return this.hpApi.deleteMessage(credentials.email, credentials.password, message.id);
      }
    )
    .map(() =>  { return true; })
  }

  private mapMessageCounts(response: Response): MessageCounts {
    let counts = response.json();
    return <MessageCounts>({
      total: counts.TotalMessages,
      unread: counts.UnreadMessages
    });
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
          time_ago: item.time_ago,
          date_created: item.CreatedDate,
        });

        return message;
      }
    );
  }

}
