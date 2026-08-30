import type { Transaction } from "@/types/ecommerce";

export const transactionsData: Transaction[] = [
  { id: "TXN-90412", orderId: "ORD-10241", customerName: "Olivia Martin", method: "Visa •• 4242", type: "sale", amount: 258.99, date: "2025-03-14T10:24:00Z", status: "completed" },
  { id: "TXN-90411", orderId: "ORD-10240", customerName: "Jackson Lee", method: "PayPal", type: "sale", amount: 129.99, date: "2025-03-13T16:02:00Z", status: "completed" },
  { id: "TXN-90410", customerName: "Store account", method: "Bank transfer", type: "payout", amount: -2500.0, date: "2025-03-13T06:00:00Z", status: "pending" },
  { id: "TXN-90409", orderId: "ORD-10235", customerName: "Emma Anderson", method: "Visa •• 4242", type: "refund", amount: -268.0, date: "2025-03-12T18:20:00Z", status: "completed" },
  { id: "TXN-90408", orderId: "ORD-10238", customerName: "Ethan Brown", method: "Apple Pay", type: "sale", amount: 96.5, date: "2025-03-12T14:31:00Z", status: "completed" },
  { id: "TXN-90407", orderId: "ORD-10237", customerName: "Sofia Davis", method: "Mastercard •• 5544", type: "sale", amount: 599.0, date: "2025-03-11T11:15:00Z", status: "failed" },
  { id: "TXN-90406", customerName: "Processing fee", method: "Stripe", type: "fee", amount: -12.4, date: "2025-03-11T00:00:00Z", status: "completed" },
  { id: "TXN-90405", orderId: "ORD-10236", customerName: "William Kim", method: "Visa •• 8008", type: "sale", amount: 183.0, date: "2025-03-10T17:58:00Z", status: "completed" },
  { id: "TXN-90404", orderId: "ORD-10234", customerName: "Liam Garcia", method: "Google Pay", type: "sale", amount: 79.99, date: "2025-03-07T08:40:00Z", status: "completed" },
  { id: "TXN-90403", customerName: "Store account", method: "Bank transfer", type: "payout", amount: -1800.0, date: "2025-03-06T06:00:00Z", status: "completed" },
  { id: "TXN-90402", orderId: "ORD-10233", customerName: "Ava Martinez", method: "Visa •• 4242", type: "sale", amount: 312.4, date: "2025-03-05T15:12:00Z", status: "completed" },
  { id: "TXN-90401", orderId: "ORD-10232", customerName: "Noah Wilson", method: "PayPal", type: "sale", amount: 148.0, date: "2025-03-04T10:05:00Z", status: "pending" },
];