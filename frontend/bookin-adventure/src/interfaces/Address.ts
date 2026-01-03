export interface Address {
  formatted: string;
  lat: number;
  lng: number;
  street_number?: string;
  route?: string;
  city: string;
  postalCode: string;
  country: string;
}
