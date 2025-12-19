export interface Booking {
  _id?: string;
  user_id?: string;
  slot_id: string;
  activity_id: string;
  basket_id?: string;
  date?: string;
  status?: 'pending' | 'paid' | 'cancelled' | 'refunded';
  payment?: string;
  cancellationPolicy?: string;
  review?: string;
  seats?: number;
  price?: number;
}
