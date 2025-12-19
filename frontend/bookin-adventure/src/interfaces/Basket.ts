export interface Basket {
  _id?: string
  user_id?: string
  items?: string[]
  status: 'pending' | 'paid' | 'expired'
  total?: number
  createdAt?: string
  paidAt?: string
  history?: Array<{ date: string; action: string }>
}
