export interface RegisterClientPayload {
  email: string
  password: string
  lastName: string
  firstName: string
  role: 'client'
  phone?: string
  profilePhoto?: string
  birthDate?: string
}

export interface RegisterProPayload {
  email: string
  password: string
  lastName: string
  firstName: string
  role: 'pro'
  phone: string
  companyName: string
  companyAddress: string
  activityDescription: string
  logo?: string
  openingHours?: Record<string, any>
  website?: string
}

export type RegisterPayload = RegisterClientPayload | RegisterProPayload
