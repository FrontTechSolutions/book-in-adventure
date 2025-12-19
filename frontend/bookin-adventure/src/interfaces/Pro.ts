export interface Pro {
  _id?: string
  user_id: string
  companyName: string
  description?: string
  photos?: {
    profile?: string
    cover?: string
    gallery?: string[]
  }
  color?: string
  socialNetworks?: {
    facebook?: string
    instagram?: string
    others?: string[]
  }
  openingHours?: Record<string, any>
  address?: string
  cancellationPolicy?: string
  animators?: string[]
  activities?: string[]
  displayOrder?: string[]
  stripeAccountId?: string
}
