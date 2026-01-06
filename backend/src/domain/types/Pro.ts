import { Address } from './Address';

export interface IPro {
  _id?: string;
  user_id: string;
  companyName: string;
  description?: string;
  photos?: {
    profile?: string;
    cover?: string;
    gallery?: string[];
  };
  color?: string;
  socialNetworks?: {
    facebook?: string;
    instagram?: string;
    others?: string[];
  };
  openingHours?: Record<string, any>;
  address?: Address;
  cancellationPolicy?: string;
  animators?: string[];
  activities?: string[];
  displayOrder?: string[];
  stripeAccountId?: string;
}
