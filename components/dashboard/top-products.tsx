import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { topProducts } from "@/data/dashboard";

export function TopProducts() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Top Products</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="whitespace-nowrap px-6 py-3 font-medium text-muted-foreground">Product</th>
                <th className="whitespace-nowrap px-6 py-3 text-right font-medium text-muted-foreground">Sales</th>
                <th className="whitespace-nowrap px-6 py-3 text-right font-medium text-muted-foreground">Revenue</th>
                <th className="whitespace-nowrap px-6 py-3 text-right font-medium text-muted-foreground">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="font-medium text-foreground">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.category}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-muted-foreground">
                    {product.sales.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-foreground">
                    {product.revenue}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Badge variant={product.growth.startsWith("+") ? "success" : "danger"}>
                      {product.growth}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}