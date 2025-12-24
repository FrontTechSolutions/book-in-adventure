export interface User {
  _id?: string
  lastName: string
  firstName?: string
  email: string
  phone?: string
  password?: string
  role: 'client' | 'pro'
  notifications?: {
    email?: boolean
    sms?: boolean
  }
  baskets?: string[]
  attachedBookings?: string[]
  registrationDate?: string
  birthDate: string
  isVerified?: boolean
}
