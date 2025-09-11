import React from 'react';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '2,547',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Products',
    value: '1,234',
    change: '+5.2%',
    changeType: 'positive' as const,
    icon: Package,
  },
  {
    title: 'Orders',
    value: '845',
    change: '+18.7%',
    changeType: 'positive' as const,
    icon: ShoppingCart,
  },
  {
    title: 'Revenue',
    value: '$45,231',
    change: '+25.3%',
    changeType: 'positive' as const,
    icon: TrendingUp,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {stat.value}
                </p>
                <p className={`text-sm mt-2 ${
                  stat.changeType === 'positive' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}