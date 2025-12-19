export interface Review {
  _id?: string
  user_id: string
  activity_id: string
  rating: number
  comment?: string
  date?: string
}
