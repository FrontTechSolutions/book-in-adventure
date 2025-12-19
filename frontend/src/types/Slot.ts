export interface Slot {
  _id?: string;
  activity_id: string;
  date: string;
  duration?: string;
  animator?: string;
  recurrence?: string;
  status?: 'available' | 'full' | 'cancelled';
  history?: Array<{
    date: string;
    action: string;
    user?: string;
  }>;
  notifications?: string[];
  seatsLeft?: number;
}
