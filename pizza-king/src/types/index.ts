export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  offer_price?: number;
  images: string[];
  rating: number;
  category: string;
  is_available: boolean;
  created_at: string;
} 