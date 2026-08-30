export type ProductStatus = "active" | "draft" | "archived" | "out-of-stock";
export type PaymentStatus = "paid" | "pending" | "refunded" | "failed";
export type FulfillmentStatus = "fulfilled" | "processing" | "shipped" | "unfulfilled" | "cancelled";
export type CustomerSegment = "vip" | "regular" | "new";
export type TransactionType = "sale" | "refund" | "payout" | "fee";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  inventory: number;
  status: ProductStatus;
  sales: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  items: number;
  amount: number;
  date: string;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  location: string;
  ordersCount: number;
  totalSpent: number;
  joinedAt: string;
  segment: CustomerSegment;
}

export interface Transaction {
  id: string;
  orderId?: string;
  customerName: string;
  method: string;
  type: TransactionType;
  amount: number;
  date: string;
  status: TransactionStatus;
}