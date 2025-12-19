export interface IBasket {
  _id?: string;
  user_id?: string;
  items: string[];
  status?: 'pending' | 'paid' | 'expired';
  total?: number;
  createdAt?: Date;
  paidAt?: Date;
  history?: Array<{
    date: Date;
    action: string;
  }>;
}
