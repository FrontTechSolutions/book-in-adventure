export interface RegisterClientPayload {
  email: string
  password: string
  lastName: string
  firstName: string
  role: 'client'
  phone?: string
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
  birthDate?: string
}

export type RegisterPayload = RegisterClientPayload | RegisterProPayload
