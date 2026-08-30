import { Armchair, Backpack, Coffee, Headphones, Watch } from "lucide-react";
import type {
  CustomerSegment,
  FulfillmentStatus,
  PaymentStatus,
  ProductStatus,
  TransactionStatus,
  TransactionType,
} from "@/types/ecommerce";

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const productStatusMeta: Record<ProductStatus, { label: string; variant: "success" | "neutral" | "danger" }> = {
  active: { label: "Active", variant: "success" },
  draft: { label: "Draft", variant: "neutral" },
  archived: { label: "Archived", variant: "neutral" },
  "out-of-stock": { label: "Out of stock", variant: "danger" },
};

export const paymentStatusMeta: Record<PaymentStatus, { label: string; variant: "success" | "warning" | "info" | "danger" }> = {
  paid: { label: "Paid", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  refunded: { label: "Refunded", variant: "info" },
  failed: { label: "Failed", variant: "danger" },
};

export const fulfillmentStatusMeta: Record<FulfillmentStatus, { label: string; variant: "success" | "warning" | "info" | "neutral" | "danger" }> = {
  fulfilled: { label: "Fulfilled", variant: "success" },
  processing: { label: "Processing", variant: "warning" },
  shipped: { label: "Shipped", variant: "info" },
  unfulfilled: { label: "Unfulfilled", variant: "neutral" },
  cancelled: { label: "Cancelled", variant: "danger" },
};

export const customerSegmentMeta: Record<CustomerSegment, { label: string; variant: "accent" | "neutral" | "info" }> = {
  vip: { label: "VIP", variant: "accent" },
  regular: { label: "Regular", variant: "neutral" },
  new: { label: "New", variant: "info" },
};

export const transactionTypeMeta: Record<TransactionType, { label: string; variant: "success" | "warning" | "info" | "neutral" }> = {
  sale: { label: "Sale", variant: "success" },
  refund: { label: "Refund", variant: "warning" },
  payout: { label: "Payout", variant: "info" },
  fee: { label: "Fee", variant: "neutral" },
};

export const transactionStatusMeta: Record<TransactionStatus, { label: string; variant: "success" | "warning" | "danger" }> = {
  completed: { label: "Completed", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  failed: { label: "Failed", variant: "danger" },
};

/** Category → icon used as the product "image" placeholder tile. */
export const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Electronics: Headphones,
  Furniture: Armchair,
  "Food & Beverage": Coffee,
  Accessories: Backpack,
  Wearables: Watch,
};