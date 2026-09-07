export type OrderStatus =
  | "new"
  | "confirmed"
  | "assigned"
  | "in_progress"
  | "completed"
  | "paid"
  | "closed"
  | "cancelled";

export type PaymentStatus = "unpaid" | "customer_paid" | "vendor_paid";

export interface Service {
  id: string;
  category: string;
  name: string;
  slug: string;
  description: string | null;
  customer_price: number;
  vendor_fee: number;
  unit: string;
  is_active: boolean;
  sort_order: number;
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string | null;
  vendor_id: string | null;
  service_id: string | null;
  customer_name: string;
  customer_phone: string;
  service_category: string;
  service_name: string;
  description: string | null;
  address: string;
  area: string;
  quantity: number;
  customer_price: number;
  vendor_fee: number;
  margin: number;
  preferred_date: string | null;
  preferred_time: string | null;
  status: OrderStatus;
  payment_status: PaymentStatus;
  source: string;
  admin_notes: string | null;
  customer_rating: number | null;
  customer_review: string | null;
  created_at: string;
  updated_at: string;
  // joined
  vendor_name?: string;
  vendor_phone?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  area: string | null;
  total_orders: number;
  last_order_at: string | null;
  created_at: string;
}

export interface Vendor {
  id: string;
  name: string;
  phone: string;
  address: string | null;
  areas: string[];
  categories: string[];
  score: number;
  is_active: boolean;
  is_verified: boolean;
  bank_name: string | null;
  bank_account: string | null;
  bank_holder: string | null;
  total_jobs: number;
  completed_jobs: number;
  avg_rating: number;
  notes: string | null;
  created_at: string;
}

export interface BookingFormData {
  service_slug: string;
  name: string;
  phone: string;
  area: string;
  address: string;
  description: string;
  quantity: number;
  preferred_date: string;
  preferred_time: string;
}
