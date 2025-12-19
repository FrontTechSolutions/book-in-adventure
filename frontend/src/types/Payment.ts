export interface Payment {
  _id?: string;
  booking_id: string;
  pro_id: string;
  amount: number;
  commission?: number;
  status?: 'pending' | 'succeeded' | 'failed' | 'refunded';
  refund?: boolean;
  history?: Array<{
    date: string;
    action: string;
  }>;
  date?: string;
}
