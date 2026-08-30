import { TransactionsView } from "@/components/ecommerce/transactions-view";

export default function TransactionsPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Transactions</h1>
        <p className="text-muted-foreground">Every movement of money in and out of your store.</p>
      </div>
      <TransactionsView />
    </div>
  );
}