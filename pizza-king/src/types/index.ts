// Product type
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

// User type with roles
export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  role: "admin" | "customer";  // required field now
  created_at?: string;
}
