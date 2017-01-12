export interface Message {
  id: string;
  account_id:string;
  title: string;
  content: string;
  unread: boolean;
  time_ago: string;
  date_created: string;
}

export interface MessageCounts {
  total: number;
  unread: number;
}
