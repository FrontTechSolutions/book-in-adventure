export interface IUser {
  _id?: string;
  lastName: string;
  firstName?: string;
  email: string;
  phone?: string;
  password: string;
  role: 'client' | 'pro';
  notifications?: {
    email?: boolean;
    sms?: boolean;
  };
  baskets?: string[];
  attachedBookings?: string[];
  registrationDate?: Date;
}
