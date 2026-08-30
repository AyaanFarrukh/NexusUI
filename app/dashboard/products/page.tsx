import { ProductsView } from "@/components/ecommerce/products-view";

export default function ProductsPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Products</h1>
        <p className="text-muted-foreground">Manage your catalog, pricing and inventory levels.</p>
      </div>
      <ProductsView />
    </div>
  );
}