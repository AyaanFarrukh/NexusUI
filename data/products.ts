import type { Product } from "@/types/ecommerce";

export const productsData: Product[] = [
  { id: "prd_001", name: "Wireless Headphones Pro", sku: "ELC-1001", category: "Electronics", price: 129.99, inventory: 142, status: "active", sales: 1234 },
  { id: "prd_002", name: "Mechanical Keyboard TKL", sku: "ELC-1002", category: "Electronics", price: 89.0, inventory: 18, status: "active", sales: 521 },
  { id: "prd_003", name: "Ergonomic Office Chair", sku: "FRN-2001", category: "Furniture", price: 349.0, inventory: 32, status: "active", sales: 892 },
  { id: "prd_004", name: "Standing Desk — Oak", sku: "FRN-2002", category: "Furniture", price: 599.0, inventory: 0, status: "out-of-stock", sales: 310 },
  { id: "prd_005", name: "Premium Coffee Beans 1kg", sku: "FNB-3001", category: "Food & Beverage", price: 24.5, inventory: 260, status: "active", sales: 632 },
  { id: "prd_006", name: "Matcha Tea Ceremony Set", sku: "FNB-3002", category: "Food & Beverage", price: 39.0, inventory: 74, status: "active", sales: 214 },
  { id: "prd_007", name: "Smart Home Hub", sku: "ELC-1003", category: "Electronics", price: 79.99, inventory: 55, status: "draft", sales: 0 },
  { id: "prd_008", name: "Leather Weekend Bag", sku: "ACC-4001", category: "Accessories", price: 189.0, inventory: 12, status: "active", sales: 178 },
  { id: "prd_009", name: "Fitness Watch S2", sku: "WRB-5001", category: "Wearables", price: 199.0, inventory: 88, status: "active", sales: 445 },
  { id: "prd_010", name: "Ceramic Desk Lamp", sku: "FRN-2003", category: "Furniture", price: 59.0, inventory: 41, status: "archived", sales: 267 },
];