import { Message } from './models/message';
export const MESSAGES: Message[] = [
  {
    title: 'Happy Birthday to Jackson!',
    content: 'Congratulations to Jackson on turning 3 this year! Enjoy a special day with your pup.',
    date: '12/26/16',
    unread: true
  },
  {
    title: 'Your Action Needed',
    content: 'Claim #110113 needs your immediate attention',
    date: '8/20/16',
    unread: true
  },
  {
    title: 'Upcoming Payment Expiration',
    content: 'This is a notification that your payment method will expire soon.',
    date: '6/2/16',
    unread: false
  },
  {
    title: 'Your Claim Was Processed',
    content: 'Claim #110113 needs your immediate attention before it will be processed',
    date: '1/2/17',
    unread: false
  },
  {
    title: 'Your Claim Was Futher Processed',
    content: 'Claim #110113 needs your immediate attention before it will be processed',
    date: '1/2/17',
    unread: true
  }
];
