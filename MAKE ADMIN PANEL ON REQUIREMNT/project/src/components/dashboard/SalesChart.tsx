import React from 'react';
import { TrendingUp } from 'lucide-react';

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

export function SalesChart() {
  const maxSales = Math.max(...salesData.map(d => d.sales));
  
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sales Overview</h3>
        <TrendingUp className="w-5 h-5 text-muted-foreground" />
      </div>
      
      <div className="space-y-4">
        {salesData.map((data) => {
          const percentage = (data.sales / maxSales) * 100;
          return (
            <div key={data.month} className="flex items-center space-x-4">
              <div className="w-8 text-sm text-muted-foreground">{data.month}</div>
              <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="w-16 text-sm font-medium text-foreground text-right">
                ${data.sales.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}