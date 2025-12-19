export interface IReview {
  _id?: string;
  user_id: string;
  activity_id: string;
  rating: number;
  comment?: string;
  date?: Date;
}
