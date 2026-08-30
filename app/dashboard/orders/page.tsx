import { OrdersView } from "@/components/ecommerce/orders-view";

export default function OrdersPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Orders</h1>
        <p className="text-muted-foreground">Track payments and fulfillment across all orders.</p>
      </div>
      <OrdersView />
    </div>
  );
}