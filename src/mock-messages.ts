import { Message, MessageAction } from './models/message';
export const MESSAGES: Message[] = [
  {
    id:"1",
    account_id:"12345",
    title: 'Happy Birthday to Jackson!',
    content: 'Congratulations to Jackson on turning 3 this year! Enjoy a special day with your pup.',
    time_ago: '12/26/16',
    date_created: '12/26/16',
    unread: true,
    action: MessageAction.none,
    cta_text: ""
  },
  {
    id:"2",
    account_id:"12345",
    title: 'Your Action Needed',
    content: 'Claim #110113 needs your immediate attention',
    time_ago: '8/20/16',
    date_created: '8/20/16',
    unread: true,
    action: MessageAction.none,
    cta_text: ""
  },
  {
    id:"3",
    account_id:"12345",
    title: 'Upcoming Payment Expiration',
    content: 'This is a notification that your payment method will expire soon.',
    time_ago: '6/2/16',
    date_created: '6/2/16',
    unread: false,
    action: MessageAction.none,
    cta_text: ""
  },
  {
    id:"4",
    account_id:"12345",
    title: 'Your Claim Was Processed',
    content: 'Claim #110113 needs your immediate attention before it will be processed',
    time_ago: '1/2/17',
    date_created: '1/2/17',
    unread: false,
    action: MessageAction.none,
    cta_text: ""
  },
  {
    id:"5",
    account_id:"12345",
    title: 'Your Claim Was Futher Processed',
    content: 'Claim #110113 needs your immediate attention before it will be processed',
    time_ago: '1/2/17',
    date_created: '1/2/17',
    unread: true,
    action: MessageAction.none,
    cta_text: ""
  }
];
