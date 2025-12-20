export interface ActivityPayload {
  title: string;
  description: string;
  mainPhoto?: File | string | null;
  gallery?: (File | string)[];
  location?: string;
  category: string;
  duration: string;
  maxPlaces: number | null;
  animator: string;
  color: string;
}
