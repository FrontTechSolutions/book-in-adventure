export interface Activity {
  _id?: string
  pro_id: string
  title: string
  description: string
  images?: string[]
  gallery?: string[]
  location?: string
  category?: string
  duration?: string
  maxSeats?: number
  animator?: string
  color?: string
  cancellationPolicy?: string
  order?: number
  featured?: boolean
}
