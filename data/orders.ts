import type { Order } from "@/types/ecommerce";

export const ordersData: Order[] = [
  { id: "ORD-10241", customerName: "Olivia Martin", email: "olivia.martin@acmecorp.com", items: 3, amount: 258.99, date: "2025-03-14T10:24:00Z", paymentStatus: "paid", fulfillmentStatus: "processing" },
  { id: "ORD-10240", customerName: "Jackson Lee", email: "jackson.lee@techflow.io", items: 1, amount: 129.99, date: "2025-03-13T16:02:00Z", paymentStatus: "paid", fulfillmentStatus: "fulfilled" },
  { id: "ORD-10239", customerName: "Mia Johnson", email: "mia.johnson@retailplus.com", items: 2, amount: 428.0, date: "2025-03-13T09:47:00Z", paymentStatus: "pending", fulfillmentStatus: "unfulfilled" },
  { id: "ORD-10238", customerName: "Ethan Brown", email: "ethan.b@cloudbase.dev", items: 5, amount: 96.5, date: "2025-03-12T14:31:00Z", paymentStatus: "paid", fulfillmentStatus: "shipped" },
  { id: "ORD-10237", customerName: "Sofia Davis", email: "sofia.davis@mediagroup.net", items: 1, amount: 599.0, date: "2025-03-11T11:15:00Z", paymentStatus: "failed", fulfillmentStatus: "cancelled" },
  { id: "ORD-10236", customerName: "William Kim", email: "will.kim@startupxyz.com", items: 4, amount: 183.0, date: "2025-03-10T17:58:00Z", paymentStatus: "paid", fulfillmentStatus: "fulfilled" },
  { id: "ORD-10235", customerName: "Emma Anderson", email: "emma.a@travelbook.co", items: 2, amount: 268.0, date: "2025-03-08T13:22:00Z", paymentStatus: "refunded", fulfillmentStatus: "cancelled" },
  { id: "ORD-10234", customerName: "Liam Garcia", email: "liam.garcia@fintrack.io", items: 1, amount: 79.99, date: "2025-03-07T08:40:00Z", paymentStatus: "paid", fulfillmentStatus: "fulfilled" },
  { id: "ORD-10233", customerName: "Ava Martinez", email: "ava.martinez@healthapp.org", items: 6, amount: 312.4, date: "2025-03-05T15:12:00Z", paymentStatus: "paid", fulfillmentStatus: "shipped" },
  { id: "ORD-10232", customerName: "Noah Wilson", email: "noah.w@edutech.com", items: 2, amount: 148.0, date: "2025-03-04T10:05:00Z", paymentStatus: "pending", fulfillmentStatus: "unfulfilled" },
  { id: "ORD-10231", customerName: "Charlotte Thomas", email: "charlotte.t@creativehub.io", items: 1, amount: 349.0, date: "2025-03-02T12:44:00Z", paymentStatus: "paid", fulfillmentStatus: "fulfilled" },
  { id: "ORD-10230", customerName: "James Taylor", email: "james.t@logisticspro.com", items: 3, amount: 227.5, date: "2025-03-01T09:18:00Z", paymentStatus: "paid", fulfillmentStatus: "processing" },
];