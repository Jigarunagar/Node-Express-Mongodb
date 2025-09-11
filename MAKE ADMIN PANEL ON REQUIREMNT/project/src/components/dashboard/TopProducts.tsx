import React from 'react';
import { Package } from 'lucide-react';

const products = [
  { name: 'Premium Headphones', sales: 125, revenue: '$15,625' },
  { name: 'Wireless Mouse', sales: 89, revenue: '$4,450' },
  { name: 'Gaming Keyboard', sales: 67, revenue: '$8,375' },
  { name: 'Monitor Stand', sales: 45, revenue: '$2,250' },
  { name: 'USB Cable', sales: 234, revenue: '$1,170' },
];

export function TopProducts() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Top Products</h3>
        <Package className="w-5 h-5 text-muted-foreground" />
      </div>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-foreground">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.sales} sold</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">{product.revenue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}