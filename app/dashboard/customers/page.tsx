import { CustomersView } from "@/components/ecommerce/customers-view";

export default function CustomersPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Customers</h1>
        <p className="text-muted-foreground">Your customer base, segmented by value and lifecycle.</p>
      </div>
      <CustomersView />
    </div>
  );
}