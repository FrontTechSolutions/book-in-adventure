export interface ISlot {
  _id?: string;
  activity_id: string;
  date: Date;
  duration?: string;
  animator?: string;
  recurrence?: string;
  status?: 'available' | 'full' | 'cancelled';
  history?: Array<{
    date: Date;
    action: string;
    user?: string;
  }>;
  notifications?: string[];
  seatsLeft?: number;
}
